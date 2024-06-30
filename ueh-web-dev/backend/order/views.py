import random
from django.utils import timezone
from .populate_data import orders_data, create_initial_orders, replace_color_in_image_url
from rest_framework import status,viewsets
from rest_framework.decorators import api_view,permission_classes, action
from rest_framework.response import Response
from .models import Orders, OrdersItem
from categories.models import Product
from .serializers import OrdersSerializer, OrdersItemSerializer, MonthlyBrandDataSerializer, BarHChartDataSerializer, TimeSeriesDataSerializer
from django.db.models.functions import TruncDate, ExtractMonth
from datetime import datetime, timedelta
from django.db.models import Count, Sum, F
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsStaffUser
from backend.settings import DATA_GENERATION
import pandas as pd
from django.http import HttpResponse
from django.db import transaction

import io

try:
    if DATA_GENERATION:
        if not Orders.objects.exists():
            create_initial_orders(orders_data)
        else:
            print('Orders already exist, skipping creation from JSON data.')
    else:
        print('Data Generation is turned off')
except Exception as e:
    print('Database orders_ cần được khởi tạo')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_orders(request, user_id):
    orders = Orders.objects.filter(user_id=user_id).order_by('-created_at')
    serializer = OrdersSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    order_data = request.data.get('order')
    items_data = request.data.get('items')
    print(user)
    order_serializer = OrdersSerializer(data=order_data, partial=True)
    print('du lieu nhap vao')
    print(order_data)
    if not order_serializer.is_valid():
        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    order = order_serializer.save(user=user)
    total_price = 0
    print(items_data, order.id)

    with transaction.atomic():
        for item_data in items_data:
            item_data['order'] = order.id
            item_serializer = OrdersItemSerializer(data=item_data,partial=True)
            print(item_data)
            print(item_serializer)
            if not item_serializer.is_valid():
                print('vo day')
                errors = item_serializer.errors
                print(errors)
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)
            
            product_id = item_data['product']
            try:
                product = Product.objects.get(id=product_id)
                if item_data['quantity'] > product.quantity:
                    return Response(
                        {'error': f'Product {product_id} does not have enough quantity'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                product.quantity -= item_data['quantity']
                product.save()

                if item_serializer.is_valid():
                    print('toi o day ne')
                    item = item_serializer.save()
                    total_price += item.total_price
                else:
                    return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            except Product.DoesNotExist:
                return Response(
                    {'error': f'Product {product_id} does not exist'},
                    status=status.HTTP_400_BAD_REQUEST
                )

    order.total_price = total_price
    order.save()
    return Response(OrdersSerializer(order).data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_items(request, order_id):
    try:
        order = Orders.objects.get(id=order_id)
    except Orders.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    orderSerializer = OrdersSerializer(order)
    order_items = OrdersItem.objects.filter(order=order)
    serializer = OrdersItemSerializer(order_items, many=True)
    items_data = serializer.data
    for item in items_data:
        product_id = item['product']
        color = item['color']
        try:
            product = Product.objects.get(id=product_id)
            base_image_url = product.imgUrl
            carName=product.carName
            brand=product.brand
            print(carName)
            print(brand)
            print(base_image_url)
            print(replace_color_in_image_url(base_image_url,color))
            imgItems=replace_color_in_image_url(base_image_url,color)
            item['carName']=carName
            item['brand']=brand
            item['imgUrl']=imgItems
        except Product.DoesNotExist:
            pass
            item['imgUrl'] = None  

    return Response({'info': orderSerializer.data, 'items': items_data})

class OrderHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OrdersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Orders.objects.filter(user=user).order_by('-created_at')

class OrderAdminViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all().order_by('-id')
    serializer_class = OrdersSerializer
    permission_classes = [IsAuthenticated, IsStaffUser]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        order_items = OrdersItem.objects.filter(order=instance)
        order_serializer = self.get_serializer(instance)
        items_serializer = OrdersItemSerializer(order_items, many=True)
        return Response({
            'order': order_serializer.data,
            'items': items_serializer.data
        })
    
    @action(detail=False, methods=['get'], url_path='first-ten-orders')
    def first_ten_orders(self, request):
        orders = Orders.objects.all().order_by('-created_at')[:10]
        order_serializer = self.get_serializer(orders, many=True)
        return Response(order_serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='cancel')
    def cancel_order(self, request, pk=None):
        instance = self.get_object()
        if instance.status == 'pending':
            order_items = OrdersItem.objects.filter(order=instance)
            
            with transaction.atomic():
                for item in order_items:
                    product = item.product
                    product.quantity += item.quantity
                    product.save()
            instance.status = 'cancelled'
            instance.save()
            return Response({'status': 'Order cancelled'}, status=status.HTTP_200_OK)
        return Response({'error': 'Order cannot be cancelled'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='complete')
    def complete_order(self, request, pk=None):
        instance = self.get_object()
        if instance.status == 'pending':
            instance.status = 'completed'
            instance.save()
            return Response({'status': 'Order completed'}, status=status.HTTP_200_OK)
        return Response({'error': 'Order cannot be completed'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.status == 'pending':
            instance.status = 'cancelled'
            instance.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Order cannot be cancelled'}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=False, methods=['get'], url_path='total-order')
    def order_total(self, request):
        stats = Orders.objects.aggregate(
        total_orders=Count('id'),
        total_revenue=Sum('total_price'),
        # total_quantity_sold=Sum('quantity')
        )
        return Response(stats, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='statistics')
    def order_statistics(self, request):
        stats = Orders.objects.values('status').annotate(
            count=Count('status'),
            total_revenue=Sum('total_price')
        )
        return Response(stats, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['get'], url_path='time-series')
    def order_time_series(self, request):
        completed_orders = Orders.objects.filter(status='completed').annotate(
            date=TruncDate('created_at')
        ).values('date').annotate(
            count=Count('id'),
            total_revenue=Sum('total_price')
        ).order_by('date')

        completed_orders = Orders.objects.filter(status='pending').annotate(
            date=TruncDate('created_at')
        ).values('date').annotate(
            count=Count('id'),
            total_revenue=Sum('total_price')
        ).order_by('date')

        cancelled_orders = Orders.objects.filter(status='cancelled').annotate(
            date=TruncDate('created_at')
        ).values('date').annotate(
            count=Count('id'),
            total_revenue=Sum('total_price')
        ).order_by('date')

        return Response({
            'completed_orders': completed_orders,
            'cancelled_orders': cancelled_orders
        }, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['get'], url_path='recent-car-orders')
    def recent_car_orders(self, request):
        thirty_days_ago = timezone.now() - timezone.timedelta(days=30)
        recent_orders = OrdersItem.objects.filter(order__created_at__gte=thirty_days_ago)
        car_order_stats = recent_orders.values('product__id', 'product__carName').annotate(
            total_quantity=Sum('quantity')
        ).order_by('-total_quantity')[:10]
        product_data = []
        for stat in car_order_stats:
            product_id = stat['product__id']
            product = Product.objects.get(id=product_id)
            product_data.append({
                'id': product.id,
                'brand': product.brand,
                'rating': product.rating,
                'carName': product.carName,
                'imgUrl': product.imgUrl,
                'model': product.model,
                'price': product.price,
                'speed': product.speed,
                'gps': product.gps,
                'seatType': product.seatType,
                'automatic': product.automatic,
                'description': product.description,
            })

        return Response(product_data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='product-stats')
    def payment_method_stats(self, request):
        stats = Orders.objects.values('payment_method').annotate(
            count=Count('id')
        ).order_by('payment_method')

        return Response(stats, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='order-status-total')
    def order_status_total(self, request):
        order_status_stats = Orders.objects.values('status').annotate(
            total_revenue=Sum('total_price'),
            count=Count('id')
        ).order_by('status')

        total_orders = Orders.objects.count()
        total_cancel_revenue = 0
        total_cancel_orders = 0
        total_completed_revenue = 0
        total_completed_orders = 0

        for stat in order_status_stats:
            if stat['status'] == 'cancelled':
                total_cancel_revenue = stat['total_revenue']
                total_cancel_orders = stat['count']
            elif stat['status'] == 'completed':
                total_completed_revenue = stat['total_revenue']
                total_completed_orders = stat['count']
        
        cancel_percentage = (total_cancel_orders / total_orders) * 100 if total_orders > 0 else 0

        response_data = {
            "order_status_stats": list(order_status_stats),
            "cancel_percentage": cancel_percentage,
            "total_cancel_revenue": total_cancel_revenue,
            "total_completed_orders": total_completed_orders,
            "total_completed_revenue": total_completed_revenue
        }

        return Response(response_data, status=status.HTTP_200_OK)

class MonthlyBrandDataViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]
    def list(self, request):
        monthly_brand_data = []

        monthly_orders = OrdersItem.objects.annotate(
            month=ExtractMonth('order__created_at')
        ).values(
            'month', 'product__brand'
        ).annotate(
            count=Count('id')
        )

        # Sắp xếp các tháng theo thứ tự từ 1 đến 12
        sorted_months = sorted(range(1, 13))

        for item in monthly_orders:
            month = item['month']
            brand = item['product__brand']
            count = item['count']

            month_entry = next((entry for entry in monthly_brand_data if entry['month'] == month), None)
            if month_entry:
                month_entry['brands'][brand] = count
            else:
                monthly_brand_data.append({
                    'month': month,
                    'brands': {brand: count}
                })

        monthly_brand_data_sorted = []
        for month in sorted_months:
            for entry in monthly_brand_data:
                if entry['month'] == month:
                    monthly_brand_data_sorted.append(entry)
                    break

        serializer = MonthlyBrandDataSerializer(monthly_brand_data_sorted, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BarHChartDataViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]
    def list(self, request):
        queryset = OrdersItem.objects.values('product__brand').annotate(
            total_quantity=Sum('quantity')
        )

        barh_data = []
        for item in queryset:
            barh_data.append({
                'label': item['product__brand'],
                'value': item['total_quantity'],
            })

        serializer = BarHChartDataSerializer(barh_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class TimeSeriesDataViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]
    def list(self, request):
        brands = Product.objects.values_list('brand', flat=True).distinct()
        time_series_data = []
        current_date = datetime.now().date()
        start_date = current_date - timedelta(days=365) 
        brand_totals = (
            Orders.objects.filter(created_at__gte=start_date)
            .values('ordersitem__product__brand')
            .annotate(total_sales=Sum('total_price'))
            .order_by('-total_sales')[:6]
        )

        top_brands = [item['ordersitem__product__brand'] for item in brand_totals]

        # print(brand_totals)


        for brand in top_brands:
            orders = Orders.objects.filter(ordersitem__product__brand=brand, created_at__gte=start_date)
            brand_data = {
                'id': brand,
                'color': f"rgb({hash(brand) % 256}, {hash(brand) % 256}, {hash(brand) % 256})", 
                'data': []
            }
            
            monthly_totals = orders.annotate(month=ExtractMonth('created_at')).values('month').annotate(
                total=Sum('total_price')
            )

            month_order = list(range(1, current_date.month+1))
            month_totals_dict = {item['month']: item for item in monthly_totals}

            for month in month_order:
                total = month_totals_dict.get(month, {'total': 0})['total']
                brand_data['data'].append({
                    'x': month, 
                    'y': float(total) 
                })

            time_series_data.append(brand_data)

        return Response(time_series_data, status=status.HTTP_200_OK)
    
class OrderStatusTimeSeriesDataViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]
    
    def list(self, request):
        statuses = Orders.objects.values_list('status', flat=True).distinct()

        time_series_data = []
        current_date = datetime.now().date()
        start_date = current_date - timedelta(days=365)  

        for status_order in statuses:
            print(status_order)
            orders = Orders.objects.filter(status=status_order, created_at__gte=start_date)
            if status_order == 'completed':
                color = "rgb(0, 128, 0)"  
            elif status_order == 'cancelled':
                color = "rgb(255, 0, 0)"  
            else:
                color = f"hsl({hash(status_order) % 360}, 70%, 50%)"  
            status_data = {
                'id': status_order,
                'color': color,  
                'data': []
            }
            
            monthly_totals = orders.annotate(month=ExtractMonth('created_at')).values('month').annotate(
                total=Sum('total_price')
            )

            month_order = list(range(1, current_date.month+1))
            month_totals_dict = {item['month']: item for item in monthly_totals}

            for month in month_order:
                total = month_totals_dict.get(month, {'total': 0})['total']
                status_data['data'].append({
                    'x': month, 
                    'y': float(total)  
                })

            time_series_data.append(status_data)

        return Response(time_series_data, status=status.HTTP_200_OK)
class OrdersTimeSeriesViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]
    def list(self, request):
        orders_data = []

        current_date = datetime.now().date()
        start_date = current_date - timedelta(days=365)

        monthly_totals = Orders.objects.filter(created_at__gte=start_date).annotate(
            month=ExtractMonth('created_at')
        ).values('month').annotate(
            total_sale=Sum('total_price')
        )
        for month in range(1, current_date.month+1):
            total_sale = next((item['total_sale'] for item in monthly_totals if item['month'] == month), 0)
            orders_data.append({
                'x': month,
                'y': float(total_sale) if total_sale else 0
            })

        data = [{
            'id': 'total_price',
            'color': 'rgb(255, 60, 32)',
            'data': orders_data
        }]

        return Response(data, status=status.HTTP_200_OK)
    
from collections import defaultdict

class OrdersBarViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]

    def list(self, request):
        current_date = datetime.now().date()
        start_date = current_date - timedelta(days=365)

        monthly_totals = OrdersItem.objects.filter(
            order__created_at__gte=start_date,
            # order__is_completed=True,
        ).annotate(
            month=ExtractMonth('order__created_at'),
            brand=F('product__brand')
        ).values('month', 'brand').annotate(
            total_sales=Sum('quantity')
        ).order_by('month', 'brand')

        bar_data = defaultdict(dict)

        for entry in monthly_totals:
            month = entry['month']
            brand = entry['brand']
            total_sales = entry['total_sales']

            if month not in bar_data:
                bar_data[month] = {
                    'month': month,
                    'BMW': 0,
                    'BMWColor': f"hsl({hash('BMW') % 360}, 70%, 50%)",
                    'Tesla': 0,
                    'TeslaColor': f"hsl({hash('Tesla') % 360}, 70%, 50%)",
                    'Toyota': 0,
                    'ToyotaColor': f"hsl({hash('Toyota') % 360}, 70%, 50%)",
                    'Nissan': 0,
                    'NissanColor': f"hsl({hash('Nissan') % 360}, 70%, 50%)",
                    'Ferrari': 0,
                    'FerrariColor': f"hsl({hash('Ferrari') % 360}, 70%, 50%)",
                    'Mercedes': 0,
                    'MercedesColor': f"hsl({hash('Mercedes') % 360}, 70%, 50%)",
                    'Audi': 0,
                    'AudiColor': f"hsl({hash('Audi') % 360}, 70%, 50%)",
                    'VinFast': 0,
                    'VinFastColor': f"hsl({hash('VinFast') % 360}, 70%, 50%)",
                }

            bar_data[month][brand] += total_sales

        bar_data_list = list(bar_data.values())

        bar_data_list.sort(key=lambda x: x['month'])
        return Response(bar_data_list, status=status.HTTP_200_OK)
class PaymentBarViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]

    def list(self, request):
        current_date = datetime.now().date()
        start_date = current_date - timedelta(days=365)

        monthly_totals = OrdersItem.objects.filter(
            order__created_at__gte=start_date,
            # order__is_completed=True,
        ).annotate(
            month=ExtractMonth('order__created_at'),
            payment_method=F('order__payment_method')
        ).values('month', 'payment_method').annotate(
            total_sales=Sum('total_price')
        ).order_by('month', 'payment_method')

        bar_data = defaultdict(dict)

        for entry in monthly_totals:
            month = entry['month']
            payment_method = entry['payment_method']
            total_sales = entry['total_sales']

            if month not in bar_data:
                bar_data[month] = {
                    'month': month,
                    'bank_transfer': 0,
                    'bank_transferColor': f"hsl({hash('bank_transfer') % 360}, 70%, 50%)",
                    'cheque': 0,
                    'chequeColor': f"hsl({hash('cheque') % 360}, 70%, 50%)",
                    'mastercard': 0,
                    'mastercardColor': f"hsl({hash('mastercard') % 360}, 70%, 50%)",
                    'paypal': 0,
                    'paypalColor': f"hsl({hash('paypal') % 360}, 70%, 50%)",
                }

            bar_data[month][payment_method] += total_sales

        bar_data_list = list(bar_data.values())

        bar_data_list.sort(key=lambda x: x['month'])

        return Response(bar_data_list, status=status.HTTP_200_OK)

class PieChartDataViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]
    
    def list(self, request):
        queryset = Orders.objects.values('status').annotate(total_price=Sum('total_price'))

        pie_data = []
        for item in queryset:
            pie_data.append({
                'id': item['status'].lower(),   
                'label': item['status'],       
                'value': float(item['total_price']), 
                'color': f"hsl({hash(item['status']) % 360}, 70%, 50%)" 
            })

        return Response(pie_data, status=status.HTTP_200_OK)

def download_excel(request):
    orders = Orders.objects.all().order_by('created_at').values(
        'pk', 'user__username', 'Firstname', 'Lastname', 'email',
        'phoneNumber', 'address', 'total_price', 'payment_method',
        'shipping_deadline', 'created_at', 'updated_at', 'note', 'status'
    )

    df = pd.DataFrame(list(orders))

    df['created_at'] = df['created_at'].apply(lambda x: x.replace(tzinfo=None))
    df['updated_at'] = df['updated_at'].apply(lambda x: x.replace(tzinfo=None))

    df.rename(columns={
        'pk': 'Order ID',
        'user__username': 'User',
        'Firstname': 'Firstname',
        'Lastname': 'Lastname',
        'email': 'Email',
        'phoneNumber': 'Phone Number',
        'address': 'Address',
        'total_price': 'Total Price',
        'payment_method': 'Payment Method',
        'shipping_deadline': 'Shipping Deadline',
        'created_at': 'Created At',
        'updated_at': 'Updated At',
        'note': 'Note',
        'status': 'Status'
    }, inplace=True)

    buffer = io.BytesIO()

    with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Orders')

    buffer.seek(0)

    response = HttpResponse(buffer, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=orders.xlsx'

    return response
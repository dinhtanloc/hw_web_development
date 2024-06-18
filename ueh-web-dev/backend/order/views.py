import random
from .populate_data import orders_data, create_initial_orders, replace_color_in_image_url
from rest_framework import status,viewsets
from rest_framework.decorators import api_view,permission_classes, action
from rest_framework.response import Response
from .models import Orders, OrdersItem
from categories.models import Product
from .serializers import OrdersSerializer, OrdersItemSerializer, MonthlyBrandDataSerializer, BarHChartDataSerializer, TimeSeriesDataSerializer
from django.db.models.functions import TruncDate, ExtractMonth
from datetime import datetime, timedelta
from django.db.models import Count, Sum
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsStaffUser
from backend.settings import DATA_GENERATION
import pandas as pd
from django.http import HttpResponse
import io

if DATA_GENERATION:
    if not Orders.objects.exists():
        create_initial_orders(orders_data)
    else:
        print('Orders already exist, skipping creation from JSON data.')
else:
    print('Data Generation is turned off')


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

    # Create the order
    order = order_serializer.save(user=user)

    # Process order items
    total_price = 0
    print(items_data, order.id)
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

        if item_serializer.is_valid():
            print('toi o day ne')
            item = item_serializer.save()
            total_price += item.total_price
        else:
            return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    # return Response({'info':orderSerializer.data,'items':serializer.data})
    items_data = serializer.data
    for item in items_data:
        product_id = item['product']
        # print(product_id)
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
            # Adjust the imgUrl field
            # item['imgUrl'] = base_image_url.replace('base', color)  # Example replacement logic
        except Product.DoesNotExist:
            pass
            item['imgUrl'] = None  # Handle the case where the product does not exist

    return Response({'info': orderSerializer.data, 'items': items_data})


class OrderAdminViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer
    permission_classes = [IsAuthenticated, IsStaffUser]

    # Xem đơn hàng
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        order_items = OrdersItem.objects.filter(order=instance)
        order_serializer = self.get_serializer(instance)
        items_serializer = OrdersItemSerializer(order_items, many=True)
        return Response({
            'order': order_serializer.data,
            'items': items_serializer.data
        })

    # Hủy đơn hàng
    @action(detail=True, methods=['post'], url_path='cancel')
    def cancel_order(self, request, pk=None):
        instance = self.get_object()
        if instance.status == 'pending':
            instance.status = 'cancelled'
            instance.save()
            return Response({'status': 'Order cancelled'}, status=status.HTTP_200_OK)
        return Response({'error': 'Order cannot be cancelled'}, status=status.HTTP_400_BAD_REQUEST)

    # Hoàn thành đơn hàng
    @action(detail=True, methods=['post'], url_path='complete')
    def complete_order(self, request, pk=None):
        instance = self.get_object()
        if instance.status == 'pending':
            instance.status = 'completed'
            instance.save()
            return Response({'status': 'Order completed'}, status=status.HTTP_200_OK)
        return Response({'error': 'Order cannot be completed'}, status=status.HTTP_400_BAD_REQUEST)

    # Overriding the destroy method to use cancel_order logic
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.status == 'pending':
            instance.status = 'cancelled'
            instance.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Order cannot be cancelled'}, status=status.HTTP_400_BAD_REQUEST)
    

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
    

    @action(detail=False, methods=['get'], url_path='payment-method-stats')
    def payment_method_stats(self, request):
        stats = Orders.objects.values('payment_method').annotate(
            count=Count('id')
        ).order_by('payment_method')

        return Response(stats, status=status.HTTP_200_OK)
    

class MonthlyBrandDataViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]
    def list(self, request):
        monthly_brand_data = []

        # Truy vấn tính tổng số lượng theo brand và tháng
        monthly_orders = OrdersItem.objects.annotate(
            month=ExtractMonth('order__created_at')
        ).values(
            'month', 'product__brand'
        ).annotate(
            count=Count('id')
        )

        # Sắp xếp các tháng theo thứ tự từ 1 đến 12
        sorted_months = sorted(range(1, 13))

        # Duyệt qua từng item trong monthly_orders
        for item in monthly_orders:
            month = item['month']
            brand = item['product__brand']
            count = item['count']

            # Tìm hoặc tạo mới mục cho tháng hiện tại trong monthly_brand_data
            month_entry = next((entry for entry in monthly_brand_data if entry['month'] == month), None)
            if month_entry:
                month_entry['brands'][brand] = count
            else:
                monthly_brand_data.append({
                    'month': month,
                    'brands': {brand: count}
                })

        # Sắp xếp monthly_brand_data theo thứ tự các tháng
        monthly_brand_data_sorted = []
        for month in sorted_months:
            for entry in monthly_brand_data:
                if entry['month'] == month:
                    monthly_brand_data_sorted.append(entry)
                    break

        # Serialize và trả về dữ liệu
        serializer = MonthlyBrandDataSerializer(monthly_brand_data_sorted, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BarHChartDataViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]
    def list(self, request):
        # Tính tổng quantity theo brand của Product từ OrderItem
        queryset = OrdersItem.objects.values('product__brand').annotate(
            total_quantity=Sum('quantity')
        )

        # Chuẩn bị dữ liệu cho BarH chart
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
        # Lấy danh sách các brand từ Product
        brands = Product.objects.values_list('brand', flat=True).distinct()

        # Tính toán tổng tiền theo brand và thời gian
        time_series_data = []
        current_date = datetime.now().date()
        start_date = current_date - timedelta(days=365)  # Lấy dữ liệu trong vòng 1 năm

        for brand in brands:
            orders = Orders.objects.filter(ordersitem__product__brand=brand, created_at__gte=start_date)
            brand_data = {
                'id': brand,
                'color': f"rgb({hash(brand) % 256}, {hash(brand) % 256}, {hash(brand) % 256})",  # Màu ngẫu nhiên dựa trên brand
                'data': []
            }
            
            # Tính tổng tiền cho mỗi tháng
            monthly_totals = orders.annotate(month=ExtractMonth('created_at')).values('month').annotate(
                total=Sum('total_price')
            )

            # Sắp xếp lại theo thứ tự các tháng từ 1 đến 12
            month_order = list(range(1, 13))
            month_totals_dict = {item['month']: item for item in monthly_totals}

            for month in month_order:
                total = month_totals_dict.get(month, {'total': 0})['total']
                brand_data['data'].append({
                    'x': month,  # Tháng
                    'y': float(total)  # Tổng tiền
                })

            time_series_data.append(brand_data)

        return Response(time_series_data, status=status.HTTP_200_OK)
    
class OrdersTimeSeriesViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsStaffUser]
    def list(self, request):
        orders_data = []

        current_date = datetime.now().date()
        start_date = current_date - timedelta(days=365)

        # Group by month and calculate total sales
        monthly_totals = Orders.objects.filter(created_at__gte=start_date).annotate(
            month=ExtractMonth('created_at')
        ).values('month').annotate(
            total_sale=Sum('total_price')
        )

        for item in monthly_totals:
            orders_data.append({
                'x': item['month'],
                'y': float(item['total_sale']) if item['total_sale'] else 0 
            })

        return Response(orders_data, status=status.HTTP_200_OK)
    

# def download_excel(request):
#     # Lấy tất cả các đơn hàng sắp xếp theo `created_at`
#     orders = Orders.objects.all().order_by('created_at')

#     # Tạo DataFrame từ dữ liệu của model `Orders`
#     data = {
#         'Order ID': [order.pk for order in orders],
#         'User': [order.user.username for order in orders],
#         'Firstname': [order.Firstname for order in orders],
#         'Lastname': [order.Lastname for order in orders],
#         'Email': [order.email for order in orders],
#         'Phone Number': [order.phoneNumber for order in orders],
#         'Address': [order.address for order in orders],
#         'Total Price': [order.total_price for order in orders],
#         'Payment Method': [order.payment_method for order in orders],
#         'Shipping Deadline': [order.shipping_deadline for order in orders],
#         'Created At': [order.created_at.replace(tzinfo=None) for order in orders], 
#         'Updated At': [order.updated_at.replace(tzinfo=None) for order in orders],
#         'Note': [order.note for order in orders],
#         'Status': [order.status for order in orders],
#     }
#     df = pd.DataFrame(data)

#     # Tạo một đối tượng BytesIO để lưu file Excel
#     buffer = io.BytesIO()

#     # Lưu DataFrame vào buffer dưới dạng file Excel
#     with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
#         df.to_excel(writer, index=False, sheet_name='Orders')

#     # Thiết lập con trỏ về đầu buffer
#     buffer.seek(0)

#     # Tạo phản hồi HTTP với file Excel
#     response = HttpResponse(buffer, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
#     response['Content-Disposition'] = 'attachment; filename=orders.xlsx'

#     return response

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
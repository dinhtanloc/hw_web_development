import random
from .populate_data import orders_data,generate_sorted_dates
from django.utils import timezone
from rest_framework import status,viewsets
from rest_framework.decorators import api_view,permission_classes, action
from rest_framework.response import Response
from .models import Orders, OrdersItem
from .serializers import OrdersSerializer, OrdersItemSerializer
from categories.models import Product
from accounts.models import User
from django.db.models.functions import TruncDate
from datetime import datetime, timedelta
from django.db.models import Count, Sum
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsStaffUser
from backend.settings import DATA_GENERATION



def create_initial_orders(orders_data, start_date):
    end_date = timezone.now()
    random_dates = generate_sorted_dates((end_date - start_date).days, start_date, end_date)
    print(random_dates)
    print(DATA_GENERATION)
    # print(orders_data)
    random.shuffle(orders_data)
    # print(orders_data)

    for random_date in random_dates:
        num_orders = random.randint(3, 10)
        
        for _ in range(num_orders):
            for order_data in orders_data:
                user_id = order_data['user_id']
                user = User.objects.get(id=user_id)
                items_data = order_data['items']     
                order_serializer = OrdersSerializer(data=order_data, partial=True)
                if order_serializer.is_valid():
                    print(order_data)
                    print('----------------------------')
                    print(user)
                    order = order_serializer.save(user=user)
                    total_price = 0
                    order.created_at = random_date
                    order.shipping_deadline = order.created_at.date() + timedelta(days=21)
                    # order.save()
                    for item_data in items_data:
                        item_data['order'] = order.id
                        product = Product.objects.get(id=item_data['product'])
                        item_data['unit_price'] = product.price
                        item_data['total_price'] = item_data['quantity'] * item_data['unit_price']

                        item_serializer = OrdersItemSerializer(data=item_data, partial=True)

                        if item_serializer.is_valid():
                            print('Start data orderitem')
                            item = item_serializer.save()
                            total_price += item.total_price
                        else:
                            print(f"Invalid item data: {item_serializer.errors}")
                    order.total_price = total_price
                    order.save()
                else:
                    print(f"Invalid order data: {order_serializer.errors}")

    print('Orders successfully created from JSON data.')
if DATA_GENERATION:
    if not Orders.objects.exists():
        create_initial_orders(orders_data,timezone.make_aware(datetime(2023, 9, 1)))
        # Gọi hàm để tạo đơn hàng
    else:
        print('Orders already exist, skipping creation from JSON data.')
else:
    print('Data Generation is not started')

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
    
    order_items = OrdersItem.objects.filter(order=order)
    serializer = OrdersItemSerializer(order_items, many=True)
    return Response(serializer.data)


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
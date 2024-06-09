from rest_framework import status,viewsets
from rest_framework.decorators import api_view,permission_classes, action
from rest_framework.response import Response
from .models import Orders, OrdersItem
from .serializers import OrdersSerializer, OrdersItemSerializer
from django.db.models.functions import TruncDate
from datetime import datetime, timedelta
from django.db.models import Count, Sum
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsStaffUser



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    order_data = request.data.get('order')
    items_data = request.data.get('items')
    print(user)

    # Validate order data
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
            # Trả về response với các lỗi
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        if item_serializer.is_valid():
            print('toi o day ne')
            item = item_serializer.save()
            total_price += item.total_price
        else:
            # If an item is not valid, return the error response
            return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Update total price of the order
    order.total_price = total_price
    order.save()

    # Return the response with created order data
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
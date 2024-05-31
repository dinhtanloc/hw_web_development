from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer

@api_view(['POST'])
def create_order(request):
    user = request.user
    order_data = request.data.get('order')
    items_data = request.data.get('items')
    
    order_serializer = OrderSerializer(data=order_data)
    if order_serializer.is_valid():
        order = order_serializer.save(user=user)
        total_price = 0
        for item_data in items_data:
            item_data['order'] = order.id
            item_serializer = OrderItemSerializer(data=item_data)
            if item_serializer.is_valid():
                item = item_serializer.save()
                total_price += item.total_price
            else:
                return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        order.total_price = total_price
        order.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
    return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_order_items(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    order_items = OrderItem.objects.filter(order=order)
    serializer = OrderItemSerializer(order_items, many=True)
    return Response(serializer.data)

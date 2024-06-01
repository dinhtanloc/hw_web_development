from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from datetime import datetime, timedelta
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    order_data = request.data.get('order')
    items_data = request.data.get('items')
    print(user)

    # Validate order data
    order_serializer = OrderSerializer(data=order_data, partial=True,context={'user': user})
    if not order_serializer.is_valid():
        print('toi o day')
        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Create the order
    order = order_serializer.save(user=user)

    # Process order items
    total_price = 0
    for item_data in items_data:
        item_data['order'] = order.id
        item_serializer = OrderItemSerializer(data=item_data)
        if item_serializer.is_valid():
            item = item_serializer.save()
            total_price += item.total_price
        else:
            # If an item is not valid, return the error response
            return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Update total price of the order
    order.total_price = total_price
    order.save()

    # Return the response with created order data
    return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_items(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    order_items = OrderItem.objects.filter(order=order)
    serializer = OrderItemSerializer(order_items, many=True)
    return Response(serializer.data)

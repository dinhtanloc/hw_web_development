from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import Orders, OrdersItem
from .serializers import OrdersSerializer, OrdersItemSerializer
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

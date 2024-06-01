from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
class OrderSerializer(serializers.ModelSerializer):
    # items = OrderItemSerializer(many=True)  # Serializer cho các mặt hàng


    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        # print('validated_data')
        # print(self.items)
        # print(validated_data)
        # items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        # for item_data in items_data:
        #     OrderItem.objects.create(order=order, **item_data)
        return order
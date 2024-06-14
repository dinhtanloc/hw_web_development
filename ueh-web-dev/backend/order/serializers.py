from rest_framework import serializers
from .models import Orders, OrdersItem
from categories.serializers import ProductSerializer
# from .serializers import OrdersSerializer
# from .views import OrdersSerializer


class OrdersItemSerializer(serializers.ModelSerializer):
    # order = serializers.SerializerMethodField()  # Sử dụng serializer tương ứng của model Orders
    # product = ProductSerializer()
    class Meta:
        model = OrdersItem
        fields = '__all__'
class OrdersSerializer(serializers.ModelSerializer):
    items = OrdersItemSerializer(many=True, read_only=True)


    class Meta:
        model = Orders
        fields = '__all__'

    def create(self, validated_data):
        # print('validated_data')
        # print(self.items)
        # print(validated_data)
        # items_data = validated_data.pop('items')
        order = Orders.objects.create(**validated_data)
        # for item_data in items_data:
        #     OrderItem.objects.create(order=order, **item_data)
        return order
from django.shortcuts import render
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from .populate_data import car_data
from rest_framework import status
from rest_framework.decorators import action


from rest_framework.response import Response


# Create your views here.
if not Product.objects.exists():
    for car in car_data:
        Product.objects.create(**car)
    print("Data imported successfully!")
else:
    print("Data already exists. No import needed.")

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=['post'], url_path='change-color')
    def change_color_and_update_img_url(self, request, pk=None):
        color = request.data.get('color')
        nameId=request.data.get('carName')
        nameId=nameId.replace(" ",'_')
        product = self.get_object()
        if color in ['red', 'white', 'black']:
            product.color = color
            # product.imgUrl = f"/media/car_images/car_{color}.png"  # Update imgUrl
            imgUrl = f"/media/all-images/cars-img/car_{nameId}_{color}.png"  # Update imgUrl
            return Response({'response': imgUrl}, status=status.HTTP_200_OK) 

            # product.save()
        # else:
        #     # Nếu màu không hợp lệ, sử dụng màu mặc định là 'white' và imgUrl mặc định
        #     product.color = 'white'
        #     product.imgUrl = "/media/car_images/car_white.png"  # Set default imgUrl
        #     product.save()

        serializer = self.get_serializer(product)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
from django.shortcuts import render
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from .populate_data import car_data


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
from django.shortcuts import render
from django.db.models import Count,Sum
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from .populate_data import car_data
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsStaffUser



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
    
class ProductAdminViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [IsAuthenticated, IsStaffUser]
        # Phương thức tạo sản phẩm
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Phương thức xóa sản phẩm
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Phương thức cập nhật sản phẩm
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    # Phương thức chỉnh sửa một phần thông tin sản phẩm
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='top-selling')
    def top_selling(self, request):
        top_products = Product.objects.annotate(
            total_sales=Count('orderitem')
        ).order_by('-total_sales')[:10]

        serializer = self.get_serializer(top_products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['get'], url_path='inventory-quantity-stats')
    def inventory_quantity_stats(self, request):
        stats = Product.objects.values('id').annotate(
            total_quantity=Sum('quantity')
        ).order_by('id')

        return Response(stats, status=status.HTTP_200_OK)

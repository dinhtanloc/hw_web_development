from django.shortcuts import render
from django.db.models import Count,Sum
from rest_framework import viewsets
from .models import Product
from order.models import OrdersItem
from .serializers import ProductSerializer, PieChartDataSerializer
from rest_framework.pagination import PageNumberPagination
from .populate_data import car_data, filter_images
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


class ProductPagination(PageNumberPagination):
    page_size = 9
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

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
    
    @action(detail=True, methods=['post'], url_path='like',permission_classes=[IsAuthenticated])
    def like_product(self, request, pk=None):
        product = self.get_object()
        
        # Tăng rating lên 1
        product.rating += 1
        product.save()
        
        return Response({'success': 'Rating increased by 1'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], url_path='find-car')
    def find_car(self, request):
        prompt = request.data.get('prompt', '')

        products = Product.objects.all()

        image_urls = [product.imgUrl for product in products]

        filtered_images = filter_images(image_urls, prompt, threshold=0.26)

        img_urls = [filtered_image[0] for filtered_image in filtered_images]

        car_names = [Product.get_car_name_from_img_url(img_url) for img_url in img_urls]

        products = []
        for img_url, car_name in zip(img_urls, car_names):
            product_data = {
                'carName': car_name,
                'imgUrl': img_url,
            }
            products.append(product_data)

        return Response({'products': products}, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
class ProductAdminViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
    # permission_classes = [IsAuthenticated, IsStaffUser]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='top-selling')
    def top_selling(self, request):
        top_products = OrdersItem.objects.values('product__carName').annotate(
            total_revenue=Sum('total_price')
        ).order_by('-total_revenue')[:10]

        return Response({'top_products':top_products}, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['get'], url_path='inventory-quantity-stats')
    def inventory_quantity_stats(self, request):
        stats = Product.objects.values('id').annotate(
            total_quantity=Sum('quantity')
        ).order_by('id')

        return Response(stats, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='cancelled-orders-product-quantity')
    def cancelled_orders_product_quantity(self, request):
        # Calculate the total quantity of products in order items of cancelled orders
        total_quantity = OrdersItem.objects.filter(order__status='cancelled').aggregate(
            total_quantity=Sum('quantity')
        )['total_quantity'] or 0

        response_data = {
            "total_quantity": total_quantity
        }

        return Response(response_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='check_inventory')
    def check_inventory(self, request):
        out_of_stock_count = Product.objects.filter(quantity=0).count()
        total_quantity = OrdersItem.objects.aggregate(total_quantity=Sum('quantity'))['total_quantity']
        return Response({'out_of_stock_count': out_of_stock_count, 'total_quantity': total_quantity}, status=status.HTTP_200_OK)

class PieChartDataViewSet(viewsets.ViewSet):
    def list(self, request):
        # Tính tổng quantity theo brand của Product từ OrderItem
        queryset = Product.objects.values('brand').annotate(total_quantity=Sum('quantity'))

        # Chuẩn bị dữ liệu cho pie chart
        pie_data = []
        for item in queryset:
            pie_data.append({
                'id': item['brand'].lower(), 
                'label': item['brand'],       
                'value': item['total_quantity'],  
                'color': f"hsl({hash(item['brand']) % 360}, 70%, 50%)"
            })

        serializer = PieChartDataSerializer(pie_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
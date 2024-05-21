from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status




@api_view(['GET'])
def ProductList(request):
    if request.method =='GET':
        products = Product.objects.all()  # Truy vấn tất cả các sản phẩm
        serializer = ProductSerializer(products, many=True)  # Serialize dữ liệu
        return Response(serializer.data, status=status.HTTP_200_OK)  # Trả về dữ liệu đã serialized
    
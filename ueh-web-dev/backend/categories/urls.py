from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductList, name='product-list'),
    # Thêm các URL khác nếu cần thiết
]

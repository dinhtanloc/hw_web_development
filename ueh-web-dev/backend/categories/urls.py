from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views



# app_name='categories'
router = DefaultRouter()
router.register(r'', views.ProductViewSet, basename='product')
router.register(r'admin/products', views.ProductAdminViewSet, basename='admin-product')
router.register(r'admin/pieData', views.PieChartDataViewSet, basename='admin-pieData')

urlpatterns = [
    path('', include(router.urls)),
]

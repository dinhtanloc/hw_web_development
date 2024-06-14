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
# urlpatterns = [
# 	path('', views.ProductViewSet.as_view(), name='products'),

# ]
# admin_router = DefaultRouter()

# # Đăng ký viewset của bạn với router, sử dụng basename là 'admin-product'
# admin_router.register(r'admin-products', views.ProductAdminViewSet, basename='admin-product')

# # Bao gồm các đường dẫn từ router của ProductAdminViewSet vào urlpatterns
# urlpatterns += [
#     path('', include(admin_router.urls)),
# ]
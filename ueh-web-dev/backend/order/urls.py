from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'admin/orders', views.OrderAdminViewSet, basename='order')
router.register(r'admin/monthly-brand-data', views.MonthlyBrandDataViewSet, basename='monthly-brand-data')
router.register(r'admin/barH-data', views.BarHChartDataViewSet, basename='barH-data')
router.register(r'admin/time-series', views.TimeSeriesDataViewSet, basename='time-series')
router.register(r'admin/sale-time-series', views.OrdersTimeSeriesViewSet, basename='sale-time-series')

app_name='orders'
urlpatterns = [
    path('', include(router.urls)),

    path('create-order/', views.create_order, name='create-order'),
    path('<int:order_id>/items/', views.get_order_items, name='get-order-items'),

]

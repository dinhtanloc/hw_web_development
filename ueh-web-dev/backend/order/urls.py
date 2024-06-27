from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'order-history', views.OrderHistoryViewSet, basename='order-history')
router.register(r'admin/orders', views.OrderAdminViewSet, basename='order')
router.register(r'admin/monthly-brand-data', views.MonthlyBrandDataViewSet, basename='monthly-brand-data')
router.register(r'admin/barH-data', views.BarHChartDataViewSet, basename='barH-data')
router.register(r'admin/time-series', views.TimeSeriesDataViewSet, basename='time-series')
router.register(r'admin/sale-time-series', views.OrdersTimeSeriesViewSet, basename='sale-time-series')
router.register(r'admin/status-time-series', views.OrderStatusTimeSeriesDataViewSet, basename='status-time-series')
router.register(r'admin/bar', views.OrdersBarViewSet, basename='bar')
router.register(r'admin/payment-bar', views.PaymentBarViewSet, basename='payment-bar')
router.register(r'admin/pieData', views.PieChartDataViewSet, basename='pieData')
# router.register(r'admin/data',views.DataViewSet, basename='data')


app_name='orders'
urlpatterns = [
    path('', include(router.urls)),
    path('<int:user_id>/orders-history/', views.user_orders, name='user_orders'),

    path('create-order/', views.create_order, name='create-order'),
    path('<int:order_id>/items/', views.get_order_items, name='get-order-items'),
    path('download-excel/', views.download_excel, name='download_excel'),

]

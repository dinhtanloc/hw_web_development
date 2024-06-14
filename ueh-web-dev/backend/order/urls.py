from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'admin/orders', views.OrderAdminViewSet, basename='order')

app_name='orders'
urlpatterns = [
    path('', include(router.urls)),

    path('create-order/', views.create_order, name='create-order'),
    path('<int:order_id>/items/', views.get_order_items, name='get-order-items'),

]

from django.urls import path
from . import views



app_name='orders'
urlpatterns = [
    path('create-order/', views.create_order, name='create-order'),
    path('order/<int:order_id>/items/', views.get_order_items, name='get-order-items'),

]

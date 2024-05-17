from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views



app_name='categories'
# router = DefaultRouter()
# router.register(r'products', views.ProductViewSet, basename='product')
# urlpatterns = [
#     path('', include(router.urls)),
# ]
urlpatterns = [
	path('', views.ProductViewSet.as_view(), name='products'),

]

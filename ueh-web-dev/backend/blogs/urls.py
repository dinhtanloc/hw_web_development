from django.urls import path,include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

from . import views



# app_name='categories'
router = DefaultRouter()
router.register(r'', views.BlogViewSet, basename='blog')
urlpatterns = [
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
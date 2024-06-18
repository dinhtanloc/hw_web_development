from django.urls import path, include
from . import views

app_name='chatbot'
urlpatterns = [

    path('', views.ChatAPIView, name='chat'),

]

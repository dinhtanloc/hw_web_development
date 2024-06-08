from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


app_name='accounts'
urlpatterns = [
	# path('register/', views.RegisterView.as_view(), name='auth_register'),
	# path('login/', views.UserLogin.as_view(), name='login'),
	# path('logout/', views.UserLogout.as_view(), name='logout'),
	# path('user/', views.UserView.as_view(), name='user'),
 
 	path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('profile/', views.profileView, name='profile'),
    path('staff/', views.isStaffEndpoint, name='staff'),
    path('admin/staff-list/', views.staff_list_view, name='list'),

    path('', views.getRoutes),
]

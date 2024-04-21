import os
from django.http import JsonResponse
from django.contrib.auth.models import User
import jwt
from dotenv import load_dotenv

load_dotenv()

class JWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        jwt_token = request.COOKIES.get('jwt')  # Lấy JWT từ cookie
        if jwt_token:
            try:
                # Giải mã JWT
                jwt_key = os.getenv('JWT_key')  # Lấy khóa JWT từ biến môi trường
                payload = jwt.decode(jwt_token, jwt_key, algorithms=['HS256'])
                user_id = payload['user_id']
                user = User.objects.get(id=user_id)
                request.user = user  # Gán user cho request
            except jwt.ExpiredSignatureError:
                return JsonResponse({'error': 'JWT has expired'}, status=401)
            except jwt.InvalidTokenError:
                return JsonResponse({'error': 'Invalid JWT'}, status=401)
            except User.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=401)

        response = self.get_response(request)
        return response

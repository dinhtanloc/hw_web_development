import openai
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv('OPENAI_key')

class ChatAPIView(APIView):
    # permission_classes = [IsAuthenticated]  # Nếu bạn muốn bảo vệ API này

    def post(self, request):
        user_message = request.data.get('message')
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        return Response({'response': response.choices[0].message['content']})

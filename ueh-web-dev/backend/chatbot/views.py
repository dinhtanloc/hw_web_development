import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from openai import OpenAI

from dotenv import load_dotenv
dotenv_path = r'D:\hw_web_development\ueh-web-dev\backend\.env'

load_dotenv()

client = OpenAI(
    api_key = os.getenv('AI_key'),
)

class ChatAPIView(APIView):
    def post(self, request):
        try:
            if isinstance(request.data, dict):
                user_message = request.data.get('message')
            else:
                user_message = request.data['message']
            print(user_message)
            response = client.chat.completions.create(
                model="ft:gpt-3.5-turbo-0125:ueh::9DUn0U80",  
                messages=[{"role": "system", "content": "You are cybersecurity specialist. Please answer any question concern about security problem!"}, {"role": "user", "content": user_message}],
                max_tokens=150
                )
            # print('memo')
            # print( response.choices[0].message['content'])
            chat_response = response.choices[0].message.content
            return Response({'response': chat_response})
        except Exception as e:
            # Xử lý các lỗi khác
            return Response({'error': 'Something went wrong. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

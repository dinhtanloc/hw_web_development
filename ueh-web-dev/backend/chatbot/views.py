import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from openai import OpenAI
import random as rd

from dotenv import load_dotenv
# dotenv_path = r'D:\hw_web_development\ueh-web-dev\backend\.env'
load_dotenv()
system_content = rd.choice(["You are car retailer at Lstore . Please answer any question to help guest and customer to use car website!","You are an employee of Lstore, specializing in selling cars from all segments. Please guide customers on how to use our website","You are an assistant at a car dealership in Vietnam. Please guide customers on how to place an order!", "You are a car retailer at Lstore. Please answer any question to help guests and customers use the car website!","You work at Lstore, specializing in car sales across all segments. Please assist customers with using our website."])

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
                model=os.getenv('CHATBOT_model'),  
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
        


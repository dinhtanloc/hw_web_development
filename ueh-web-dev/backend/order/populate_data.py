import random
from datetime import datetime, timedelta
from .serializers import OrdersSerializer, OrdersItemSerializer
from categories.models import Product
from accounts.models import User
from django.utils import timezone

orders_data = [
    {
        "user_id": 1,
        "Firstname": "John",
        "Lastname": "Doe",
        "email": "meo@gmail.com",
        "phoneNumber": "123456789",
        "address": "123 Main St",
        "payment_method": "paypal",
        "note": "Please deliver between 9am-5pm",
        "status": "pending",
        "items": [
            {
                "product": 1,
                "quantity": 2,
                "color": "red"
            }
        ]
    },
    {
        "user_id": 2,
        "Firstname": "Jane",
        "Lastname": "Smith",
        "email": "yo@gmail.com",
        "phoneNumber": "987654321",
        "address": "456 Elm St",
        "payment_method": "mastercard",
        "note": "Call before delivery",
        "status": "pending",
        "items": [
            {
                "product": 3,
                "quantity": 3,
                "color": "white"
            }
        ]
    },
    {
        "user_id": 3,
        "Firstname": "Alice",
        "Lastname": "Johnson",
        "email": "gaugau2009@gmail.com",
        "phoneNumber": "555555555",
        "address": "789 Oak St",
        "payment_method": "cheque",
        "note": "Leave package by the door",
        "status": "pending",
        "items": [
            {
                "product": 5,
                "quantity": 1,
                "color": "black"
            }
        ]
    },
    {
        "user_id": 4,
        "Firstname": "Bob",
        "Lastname": "Brown",
        "email": "bob.brown@apple.com",
        "phoneNumber": "111111111",
        "address": "321 Pine St",
        "payment_method": "paypal",
        "note": "Urgent delivery required",
        "status": "pending",
        "items": [
            {
                "product": 7,
                "quantity": 2,
                "color": "white"
            }
        ]
    },
    {
        "user_id": 5,
        "Firstname": "Emily",
        "Lastname": "Davis",
        "email": "Meodoraemon@gmail.com",
        "phoneNumber": "222222222",
        "address": "987 Maple St",
        "payment_method": "mastercard",
        "note": "Gift wrap required",
        "status": "pending",
        "items": [
            {
                "product": 6,
                "quantity": 1,
                "color": "white"
            },
            {
                "product": 7,
                "quantity": 3,
                "color": "black"
            }
        ]
    },
    {
        "user_id": 6,
        "Firstname": "Michael",
        "Lastname": "Wilson",
        "email": "michael.wilson@huawei.com",
        "phoneNumber": "333333333",
        "address": "654 Birch St",
        "payment_method": "paypal",
        "note": "Please include a gift message",
        "status": "pending",
        "items": [
            {
                "product": 4,
                "quantity": 2,
                "color": "black"
            },
            {
                "product": 5,
                "quantity": 1,
                "color": "white"
            }
        ]
    },
    {
        "user_id": 7,
        "Firstname": "Olivia",
        "Lastname": "Martinez",
        "email": "olivia.martinez@alibaba.com",
        "phoneNumber": "444444444",
        "address": "246 Cedar St",
        "payment_method": "bank_transfer",
        "note": "Please call upon arrival",
        "status": "pending",
        "items": [
            {
                "product": 1,
                "quantity": 2,
                "color": "red"
            },
            {
                "product": 3,
                "quantity": 1,
                "color": "white"
            }
        ]
    },
    {
        "user_id": 8,
        "Firstname": "Huong",
        "Lastname": "Do",
        "email": "huongdo@gmail.com",
        "phoneNumber": "666666666",
        "address": "135 Walnut St",
        "payment_method": "mastercard",
        "note": "Special instructions: fragile",
        "status": "pending",
        "items": [
            {
                "product": 4,
                "quantity": 1,
                "color": "white"
            },
            {
                "product": 6,
                "quantity": 1,
                "color": "black"
            }
        ]
    },
    {
        "user_id": 9,
        "Firstname": "Huong Thanh",
        "Lastname": "Do",
        "email": "huongthanh2003@gmail.com",
        "phoneNumber": "777777777",
        "address": "369 Pine St",
        "payment_method": "paypal",
        "note": "Delivery instructions: leave at front desk",
        "status": "pending",
        "items": [
            {
                "product": 6,
                "quantity": 2,
                "color": "red"
            },
            {
                "product": 7,
                "quantity": 2,
                "color": "black"
            }
        ]
    },
    {
        "user_id": 10,
        "Firstname": "Kim",
        "Lastname": "Duong",
        "email": "kimduong2003@gmail.com",
        "phoneNumber": "888888888",
        "address": "579 Oak St",
        "payment_method": "mastercard",
        "note": "Please ring doorbell upon arrival",
        "status": "pending",
        "items": [
            {
                "product": 2,
                "quantity": 1,
                "color": "white"
            },
            {
                "product": 4,
                "quantity": 2,
                "color": "red"
            }
        ]
    }
]

def replace_color_in_image_url(base_url, color):
    last_slash_index = base_url.rfind('/')    
    path = base_url[:last_slash_index]
    filename = base_url[last_slash_index + 1:]    
    name, extension = filename.split('.')

    current_color=name.split("_")[-1]    
    new_filename = f"{name.replace(current_color, color)}.{extension}"
    print(new_filename)
    new_url = f"{path}/{new_filename}"
    
    return new_url


def random_date(start, end):
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds())),
    )

def generate_sorted_dates(n, start_date, end_date):
    dates = [random_date(start_date, end_date) for _ in range(n)]
    dates.sort()
    return dates

def create_initial_orders(orders_data, start_date=timezone.make_aware(datetime(2023, 9, 1))):
    end_date = timezone.now()
    random_dates = generate_sorted_dates((end_date - start_date).days, start_date, end_date)
    print(random_dates)
    # print(DATA_GENERATION)
    # print(orders_data)
    random.shuffle(orders_data)
    # print(orders_data)

    for random_date in random_dates:
        num_orders = random.randint(3, 7)
        
        for _ in range(num_orders):
            for order_data in orders_data:
                user_id = order_data['user_id']
                user = User.objects.get(id=user_id)
                items_data = order_data['items']     
                print(user)
                order_serializer = OrdersSerializer(data=order_data, partial=True)
                if order_serializer.is_valid():
                    print('----------------------------')
                    order = order_serializer.save(user=user)
                    total_price = 0
                    order.created_at = random_date
                    order.shipping_deadline = order.created_at.date() + timedelta(days=21)
                    # order.save()
                    for item_data in items_data:
                        item_data['order'] = order.id
                        product = Product.objects.get(id=item_data['product'])
                        item_data['unit_price'] = product.price
                        item_data['total_price'] = item_data['quantity'] * item_data['unit_price']

                        item_serializer = OrdersItemSerializer(data=item_data, partial=True)

                        if item_serializer.is_valid():
                            print(f'Start data orderitem: {item_data}')
                            item = item_serializer.save()
                            total_price += item.total_price
                        else:
                            print(f"Invalid item data: {item_serializer.errors}")
                    order.total_price = total_price
                    order.save()
                else:
                    print(f"Invalid order data: {order_serializer.errors}")
    print('Orders successfully created from JSON data.')
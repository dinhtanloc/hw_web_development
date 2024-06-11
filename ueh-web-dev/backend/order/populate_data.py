import random
from datetime import datetime, timedelta


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



def random_date(start, end):
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds())),
    )

def generate_sorted_dates(n, start_date, end_date):
    dates = [random_date(start_date, end_date) for _ in range(n)]
    dates.sort()
    return dates


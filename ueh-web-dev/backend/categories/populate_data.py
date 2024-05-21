from .models import Product

car_data = [
    {
        'id': 1,
        'brand': "Tesla",
        'rating': 112,
        'car_name': "Tesla Malibu",
        'img_url': "/media/all-images/cars-img/nissan-offer.png",
        'model': "Model 3",
        'price': 50,
        'speed': "20kmpl",
        'gps': "GPS Navigation",
        'seat_type': "Heated seats",
        'automatic': "Automatic",
        'description': "The Tesla Malibu is a luxurious electric sedan. It combines sleek design with cutting-edge technology, offering a comfortable and eco-friendly driving experience. With advanced features like GPS Navigation and Heated Seats, it's perfect for those who value both style and sustainability."
    },
    {
        'id': 2,
        'brand': "Toyota",
        'rating': 102,
        'car_name': "Toyota Aventador",
        'img_url': "/media/all-images/cars-img/offer-toyota.png",
        'model': "Model-2022",
        'price': 50,
        'speed': "20kmpl",
        'gps': "GPS Navigation",
        'seat_type': "Heated seats",
        'automatic': "Automatic",
        'description': "The Toyota Aventador is a reliable and versatile SUV. With its spacious interior and rugged design, it's perfect for both city driving and off-road adventures. Equipped with advanced features like GPS Navigation and Automatic Transmission, it offers a smooth and comfortable ride in any situation."
    },
    {
        'id': 3,
        'brand': "BMW",
        'rating': 132,
        'car_name': "BMW X3",
        'img_url': "/media/all-images/cars-img/bmw-offer.png",
        'model': "Model-2022",
        'price': 65,
        'speed': "20kmpl",
        'gps': "GPS Navigation",
        'seat_type': "Heated seats",
        'automatic': "Automatic",
        'description': "The BMW X3 is a luxurious and sporty crossover SUV. With its powerful engine and agile handling, it delivers an exhilarating driving experience. The spacious interior is equipped with premium amenities like Heated Seats and GPS Navigation, ensuring a comfortable and convenient journey every time."
    },
    {
        'id': 4,
        'brand': "Nissan",
        'rating': 102,
        'car_name': "Nissan Mercielago",
        'img_url': "/media/all-images/cars-img/nissan-offer.png",
        'model': "Model-2022",
        'price': 70,
        'speed': "20kmpl",
        'gps': "GPS Navigation",
        'seat_type': "Heated seats",
        'automatic': "Automatic",
        'description': "The Nissan Mercielago is a stylish and efficient sedan. With its sleek design and spacious interior, it offers a comfortable and enjoyable driving experience. Equipped with features like GPS Navigation and Automatic Transmission, it's perfect for daily commutes and weekend getaways."
    },
    {
        'id': 5,
        'brand': "Ferrari",
        'rating': 94,
        'car_name': "Ferrari Camry",
        'img_url': "/media/all-images/cars-img/offer-toyota.png",
        'model': "Model-2022",
        'price': 45,
        'speed': "20kmpl",
        'gps': "GPS Navigation",
        'seat_type': "Heated seats",
        'automatic': "Automatic",
        'description': "The Ferrari Camry is a sleek and powerful sports car. With its aerodynamic design and high-performance engine, it offers an exhilarating driving experience. The luxurious interior features amenities like Heated Seats and GPS Navigation, ensuring both comfort and convenience on the road."
    },
    {
        'id': 6,
        'brand': "Mercedes",
        'rating': 119,
        'car_name': "Mercedes Benz XC90",
        'img_url': "/media/all-images/cars-img/mercedes-offer.png",
        'model': "Model-2022",
        'price': 85,
        'speed': "20kmpl",
        'gps': "GPS Navigation",
        'seat_type': "Heated seats",
        'automatic': "Automatic",
        'description': "The Mercedes Benz XC90 is a luxurious and versatile SUV. With its spacious interior and advanced technology, it offers a comfortable and enjoyable driving experience for the whole family. Equipped with features like Heated Seats and GPS Navigation, it's perfect for both daily commutes and long road trips."
    },
    {
        'id': 7,
        'brand': "Audi",
        'rating': 82,
        'car_name': "Audi Fiesta",
        'img_url': "/media/all-images/cars-img/toyota-offer-2.png",
        'model': "Model 3",
        'price': 50,
        'speed': "20kmpl",
        'gps': "GPS Navigation",
        'seat_type': "Heated seats",
        'automatic': "Automatic",
        'description': "The Audi Fiesta is a stylish and reliable sedan. With its sleek design and comfortable interior, it offers a pleasant driving experience for daily commutes and weekend trips. Equipped with features like GPS Navigation and Automatic Transmission"

    },
]

for car in car_data:
    Product.objects.create(**car)

print('Process successfull')
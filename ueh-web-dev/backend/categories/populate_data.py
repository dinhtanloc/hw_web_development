# from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import os
from backend.settings import model, device, processor, PUBLIC_DIR


car_data = [
    {
        "id": 1,
        "brand": "Tesla",
        "rating": 112,
        "carName": "Tesla Malibu",
        "imgUrl": "/media/all-images/cars-img/car_Tesla_Malibu_red.png",
        "model": "Model 3",
        "price": 60000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The Tesla Malibu is a luxurious electric sedan. It combines sleek design with cutting-edge technology, offering a comfortable and eco-friendly driving experience. With advanced features like GPS Navigation and Heated Seats, it's perfect for those who value both style and sustainability.",
        "quantity": 20
    },
    {
        "id": 2,
        "brand": "Toyota",
        "rating": 102,
        "carName": "Toyota Aventador",
        "imgUrl": "/media/all-images/cars-img/car_Toyota_Aventador_white.png",
        "model": "Model-2022",
        "price": 45000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The Toyota Aventador is a reliable and versatile SUV. With its spacious interior and rugged design, it's perfect for both city driving and off-road adventures. Equipped with advanced features like GPS Navigation and Automatic Transmission, it offers a smooth and comfortable ride in any situation.",
        "quantity": 5
    },
    {
        "id": 3,
        "brand": "Toyota",
        "rating": 102,
        "carName": "Toyota Land Cruiser",
        "imgUrl": "/media/all-images/cars-img/car_Toyota_Land_Cruiser_white.png",
        "model": "Model-2022",
        "price": 55000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The Toyota Land Cruiser is a robust and reliable SUV. Known for its durability and off-road capability, it's the ideal vehicle for adventure seekers. Featuring advanced GPS Navigation and Heated Seats, it ensures a comfortable and safe journey on any terrain.",
        "quantity": 5
    },
    {
        "id": 4,
        "brand": "BMW",
        "rating": 132,
        "carName": "BMW X3",
        "imgUrl": "/media/all-images/cars-img/car_BMW_X3_red.png",
        "model": "Model-2022",
        "price": 65000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The BMW X3 is a luxurious and sporty crossover SUV. With its powerful engine and agile handling, it delivers an exhilarating driving experience. The spacious interior is equipped with premium amenities like Heated Seats and GPS Navigation, ensuring a comfortable and convenient journey every time.",
        "quantity": 15
    },
    {
        "id": 5,
        "brand": "BMW",
        "rating": 132,
        "carName": "BMW 5",
        "imgUrl": "/media/all-images/cars-img/car_BMW_5_red.png",
        "model": "Model-2024",
        "price": 70000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The BMW 5 Series is a premium sedan that combines elegance with performance. Its sophisticated design and powerful engine offer an unmatched driving experience. Equipped with Heated Seats and GPS Navigation, the BMW 5 Series ensures comfort and convenience for all passengers.",
        "quantity": 15
    },
    {
        "id": 6,
        "brand": "Nissan",
        "rating": 102,
        "carName": "Nissan Mercielago",
        "imgUrl": "/media/all-images/cars-img/car_Nissan_Mercielago_black.png",
        "model": "Model-2022",
        "price": 55000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The Nissan Mercielago is a stylish and efficient sedan. With its sleek design and spacious interior, it offers a comfortable and enjoyable driving experience. Equipped with features like GPS Navigation and Automatic Transmission, it's perfect for daily commutes and weekend getaways.",
        "quantity": 6
    },
    {
        "id": 7,
        "brand": "Ferrari",
        "rating": 94,
        "carName": "Ferrari Camry",
        "imgUrl": "/media/all-images/cars-img/car_Ferrari_Camry_red.png",
        "model": "Model-2022",
        "price": 120000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The Ferrari Camry is a sleek and powerful sports car. With its aerodynamic design and high-performance engine, it offers an exhilarating driving experience. The luxurious interior features amenities like Heated Seats and GPS Navigation, ensuring both comfort and convenience on the road.",
        "quantity": 10
    },
    {
        "id": 8,
        "brand": "Mercedes",
        "rating": 119,
        "carName": "Mercedes Benz XC90",
        "imgUrl": "/media/all-images/cars-img/car_Mercedes_Benz_XC90_white.png",
        "model": "Model-2022",
        "price": 85000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The Mercedes Benz XC90 is a luxurious and versatile SUV. With its spacious interior and advanced technology, it offers a comfortable and enjoyable driving experience for the whole family. Equipped with features like Heated Seats and GPS Navigation, it's perfect for both daily commutes and long road trips.",
        "quantity": 3
    },
    {
        "id": 9,
        "brand": "Mercedes",
        "rating": 119,
        "carName": "Mercedes Benz Maybach",
        "imgUrl": "/media/all-images/cars-img/car_Mercedes_Benz_Maybach_white.png",
        "model": "Model-2022",
        "price": 200000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The Mercedes Benz Maybach is the epitome of luxury and elegance. With its premium features and opulent design, it provides an unparalleled driving experience. Features like Heated Seats and GPS Navigation make it perfect for those who seek comfort and sophistication in every journey.",
        "quantity": 3
    },
    {
        "id": 10,
        "brand": "Audi",
        "rating": 82,
        "carName": "Audi Fiesta",
        "imgUrl": "/media/all-images/cars-img/car_Audi_Fiesta_white.png",
        "model": "Model 3",
        "price": 35000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The Audi Fiesta is a stylish and reliable sedan. With its sleek design and comfortable interior, it offers a pleasant driving experience for daily commutes and weekend trips. Equipped with features like GPS Navigation and Automatic Transmission, it's perfect for any journey.",
        "quantity": 7
    },
    {
        "id": 11,
        "brand": "Audi",
        "rating": 82,
        "carName": "Audi A8",
        "imgUrl": "/media/all-images/cars-img/car_Audi_A8_white.png",
        "model": "Model 3",
        "price": 90000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The Audi A8 is a luxurious and technologically advanced sedan. Known for its superior comfort and innovative features, it offers a top-notch driving experience. With amenities like Heated Seats and GPS Navigation, the Audi A8 ensures both luxury and convenience.",
        "quantity": 7
    },
    {
        "id": 12,
        "brand": "VinFast",
        "rating": 82,
        "carName": "VinFast VF3",
        "imgUrl": "/media/all-images/cars-img/car_VinFast_VF3_white.png",
        "model": "Model 3",
        "price": 25000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The VinFast VF3 is a compact and affordable electric vehicle. With its modern design and efficient performance, it's perfect for urban driving. Featuring Heated Seats and GPS Navigation, it offers great value for an eco-friendly commute.",
        "quantity": 7
    },
    {
        "id": 13,
        "brand": "VinFast",
        "rating": 82,
        "carName": "VinFast VFe34",
        "imgUrl": "/media/all-images/cars-img/car_VinFast_VFe34_white.png",
        "model": "Model 3",
        "price": 35000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The VinFast VFe34 is a versatile and efficient electric SUV. Combining spacious interior with advanced technology, it offers a smooth and eco-friendly driving experience. Equipped with Heated Seats and GPS Navigation, it's ideal for family trips and daily use.",
        "quantity": 7
    },
    {
        "id": 14,
        "brand": "VinFast",
        "rating": 82,
        "carName": "VinFast VF8",
        "imgUrl": "/media/all-images/cars-img/car_VinFast_VF8_white.png",
        "model": "Model 3",
        "price": 40000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The VinFast VF8 is a mid-sized electric SUV designed for modern families. It offers a balance of performance, comfort, and efficiency. With features like GPS Navigation and Heated Seats, it provides a premium driving experience at an affordable price.",
        "quantity": 7
    },
    {
        "id": 15,
        "brand": "VinFast",
        "rating": 82,
        "carName": "VinFast VF9",
        "imgUrl": "/media/all-images/cars-img/car_VinFast_VF9_white.png",
        "model": "Model 3",
        "price": 45000,
        "speed": "20kmpl",
        "gps": "GPS Navigation",
        "seatType": "Heated seats",
        "automatic": "Automatic",
        "description": "The VinFast VF9 is a large electric SUV that combines luxury with efficiency. Its spacious interior and cutting-edge technology make it perfect for long journeys and family adventures. Features like Heated Seats and GPS Navigation ensure a comfortable and enjoyable drive.",
        "quantity": 7
    }
]


def filter_images(image_paths, prompt, threshold=0.3):
    filtered_images = []
    text_inputs = processor(text=[prompt], return_tensors="pt", padding=True).to(device)

    for image_url in image_paths:
        print(PUBLIC_DIR)
        image_path=os.path.join(PUBLIC_DIR,image_url.lstrip('/'))
        print(image_path)
        image = Image.open(image_path)
        image_input = processor(images=image, return_tensors="pt", padding=True).to(device)

        with torch.no_grad():
            image_features = model.get_image_features(**image_input)
            text_features = model.get_text_features(**text_inputs)
        
        image_features /= image_features.norm(dim=-1, keepdim=True)
        text_features /= text_features.norm(dim=-1, keepdim=True)
        
        similarity = torch.matmul(image_features, text_features.T).item()
        
        if similarity > threshold:
            filtered_images.append((image_url, similarity))
            print(f'{image_url} with {similarity}')
    
    return filtered_images
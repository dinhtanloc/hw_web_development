# Web Project: Car Retailer 
[!The project's web diagram and accompanying technologies.](project.png)
This project is a fullstack web product primarily programmed in Python and JavaScript. The project consists of two parts: the frontend is developed using React + Vite.js, and the backend is developed using the Django framework. Some additional technologies are clearly displayed in the diagram as described.
## install
### Frontend
```
cd frontend
npm i
```

### Backend
```
cd backend
pip install -r requirements.txt

```

## quick start
You can start the application immediately by following these instructions.
Prepare the .env file for both the frontend and backend with the content as described below.
```
// frontend/.env

VITE_DOMAIN_BACKEND = http://127.0.0.1:8000
VITE_FACEBOOK= 'Link to facebook'
VITE_LINKEDIN= 'Link to LinkedIn'

```

```
// backend/.env
// Info your DBMS
DB_name= 'name database'
DB_user= 'PostgreSQL user'
DB_password= 'Your password'
DB_port= 'PORT'
AI_key =  'OPEN AI keys' //Info your OPENAI keys accounts
DJANGO_keys = 'Django project keys'

```

In the terminal, navigate to the root directory of the project and enter the following commands.

```
// ./ueh-web-dev
cd frontend

// ./frontend
npm run dev


// Your web backend domain is http://localhost:5173
// ./ueh-web-dev
cd backend

// ./backend
python manage.py makemigrations accounts blogs categories order
python manage.py migrate
python manage.py runserver //start backend

// Your web backend domain is http://localhost:8000
// If you want to create admin account to login Django backend admin template, you can use these syntax:
python manage.py makemigrations
// Input your infomation and follow instrucstion
// After you create admin accounts, you can login at http://localhost:8000/admin
```

## Note about data generations
When you run Django backend, the product categories will be automatically added. You can customize the product list as desired here.
```
/backend/categories/populate_data.py
```

If you want to generate orders from customer to demo admin data visualization graph at http://localhost:5173/admin, you can follow instructions below
```
backend/backend/settings.py
DATA_GENERATION = True // default DATA_GENERATION=False
```

## Description about project
* On the admin side(http://localhost:8000/admin): Only admins (usually store owners or individuals authorized to assign roles within the company) can access the admin backend page. Here, they can directly edit the database as well as control and assign roles to employees.
* On the staff side, (http://localhost:5173/admin/*): Users granted permissions directly by the admin can view the company's revenue statistics and also edit product information and delete products from the database. They have the authority to mark an order as completed or canceled but are strictly prohibited from modifying customer orders or making deeper interventions in the database management system.
* On the client side (http://localhost:5173/*): Customers have full access to all features on the website but cannot access the admin or staff sides without permission granted by the admin. They can place orders, view products, edit their personal information, and review their order history.
* On the guest side, individuals who haven't created an account or been authenticated can use and view product information and all client-side features. However, they are restricted from interacting with their shopping cart. If they attempt to access the cart, they will be prompted to register and authenticate their account.

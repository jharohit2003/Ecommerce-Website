🛒 E-Commerce Website

An end-to-end E-Commerce platform built using React, Node.js, Express.js, and MongoDB, with separate repositories for Client (Frontend), Backend (API), and Admin Panel. The project includes authentication, product management, cart functionality, and secure payment integrations.

🚀 Features
🔹 Client (Frontend - viteapp)

User-friendly shopping interface built with React.

Browse products with categories & filters.

Add to cart, checkout, and place orders.

JWT-based authentication (Login/Signup).

Responsive UI for mobile & desktop.

🔹 Admin Panel

Secure login for admin.

Add, update, and delete products.

Manage orders and user details.

Cloudinary integration for product image uploads.

🔹 Backend (Node.js + Express.js + MongoDB)

RESTful API for client and admin panel.

Authentication & Authorization using JWT.

Product & User management.

Order tracking system.

Secure password storage using bcrypt.

MongoDB Atlas for scalable cloud database.

🛠️ Tech Stack

Frontend (Client & Admin):

React.js

React Router

Axios

TailwindCSS / CSS

Backend:

Node.js

Express.js

MongoDB (Mongoose ORM)

JWT (Authentication)

Cloudinary (Image Storage)

⚙️ Installation & Setup
🔹 Clone Repositories
# Clone client
git clone https://github.com/jharohit2003/Ecommerce-Website.git
cd Ecommerce-Website

# Clone backend
git clone https://github.com/jharohit2003/Ecommerce-Backend.git
cd Ecommerce-Backend

# Clone admin
git clone https://github.com/jharohit2003/Ecommerce-Admin.git
cd Ecommerce-Admin

🔹 Backend Setup

Go inside backend folder.

Create .env file and add the following:

PORT=4000
MONGODB_URI="your_mongodb_connection_string"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_SECRET_KEY="your_cloudinary_secret_key"
CLOUDINARY_NAME="your_cloudinary_name"
JWT_SECRET="your_jwt_secret"
ADMIN_EMAIL="your_admin_email"
ADMIN_PASSWORD="your_admin_password"


Install dependencies & start server:

npm install
npm start


Backend runs at http://localhost:4000

🔹 Client & Admin Setup

Go inside Client or Admin folder.

Install dependencies:

npm install
npm start


Runs at http://localhost:3000
 by default.

📂 Project Structure
Ecommerce-Website/
│── client/        # React frontend for users
│── admin/         # React frontend for admin panel
│── backend/       # Node.js + Express.js API

🔒 Environment Variables

Make sure you add the following environment variables in .env:

PORT → Server port

MONGODB_URI → MongoDB connection string

CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY, CLOUDINARY_NAME → For image uploads

JWT_SECRET → Secret key for authentication

ADMIN_EMAIL, ADMIN_PASSWORD → Default admin credentials

📦 Deployment

Client (React App) → Vercel

Backend (API) → Render
 / Railway
 / Heroku

Database → MongoDB Atlas

👨‍💻 Author

Rohit Jha
📧 Email: jharohit2222@gmail.com

🔗 GitHub: @jharohit2003

⭐ Contribute

Contributions are welcome! Please fork the repo and create a pull request.

📜 License

This project is licensed under the MIT License.

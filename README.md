# BookWorm Server
Backend API for the BookWorm - A Personalized Book Recommendation & Reading Tracker Application

This repository contains the **server-side application** for BookWorm.  
It handles authentication, role-based authorization, database operations, image uploads, reviews moderation, and recommendation logic.

---

## Live API
coming soon...

---

## Frontend Client
coming soon...
---

## Authentication
- JWT-based authentication
- Secure password hashing
- Role-based access control (Admin / User)
- Protected routes and middleware

---

## Core Features
- User registration & login
- Role management (Admin / User)
- Book CRUD operations
- Genre/category management
- Review submission & moderation
- Reading progress tracking
- Personalized recommendation logic
- Image upload (Cloudinary)

---

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JavaScript
- JWT Authentication

## API Documentation
All protected routes require the `token` HttpOnly cookie. Frontend requests must use `withCredentials: true`.

---

<!-- ### Authentication
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create new account | No |
| `POST` | `/api/auth/login` | Login & set auth cookies | No |
| `GET` | `/api/auth/me` | Get current user data | Yes |
| `POST` | `/api/auth/logout` | Clear all auth cookies | Yes |


### URL Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/urls/shorten` | Create a shortened URL (Max 100/free) | Yes | -->


## Database Setup and Schema
coming soon...

## Installation & Setup

1. **Clone the repo:**
```bash
git clone [https://github.com/your-username/bookworm-server.git](https://github.com/your-username/bookworm-server.git)
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Environment Variables:**
Create a .env file and add, also added a .env.example for demonstration
```bash
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

4. **Start the server:**
```bash
npm run dev
```

Thanks, any feedback is welcome!
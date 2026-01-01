# FinFlow - Finance Tracker App

A full-stack finance/money tracker application built with React and Node.js/Express.

## Features

### Frontend

- ✅ Responsive design with TailwindCSS
- ✅ User authentication (Signup/Login)
- ✅ Protected routes
- ✅ Dashboard with expense visualization using Chart.js
- ✅ Transaction management (CRUD operations)
- ✅ Search and filter transactions
- ✅ User profile management
- ✅ Form validation (client-side)

### Backend

- ✅ RESTful API with Express.js
- ✅ MongoDB database
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Server-side validation
- ✅ Error handling middleware
- ✅ Protected API routes

## Tech Stack

### Frontend

- TailwindCSS
- Chart.js / react-chartjs-2
- Axios

### Backend

- Node.js
- Express.js
- MongoDB / Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finflow
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In the root directory, install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## Project Structure

```
FinFlow/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── transactions.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   └── Profile.jsx
|   |   └── Home.jsx 
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Transactions

- `GET /api/transactions` - Get all transactions (with search/filter)
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/stats/dashboard` - Get dashboard statistics

### User

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile





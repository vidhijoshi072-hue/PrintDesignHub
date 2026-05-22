# Printhub - Complete Setup Guide

## 🎯 Project Overview

Printhub is a **professional print-on-demand platform** with:
- Modern React TypeScript frontend
- Express.js backend with MongoDB
- Real-time chat with Socket.io
- Razorpay payment integration
- Full user authentication & authorization

---

## 📋 Prerequisites

### System Requirements
- Node.js 16+ (LTS recommended)
- npm 8+ or yarn 1.22+
- MongoDB 4.0+ (local or Atlas cloud)
- Git

### Accounts
- MongoDB Atlas account (free tier available)
- Razorpay merchant account (for payments)

---

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd PrinthubBackend-main
```

### Step 2: Backend Setup

#### 2a. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 2b. Configure Environment Variables
Create `.env` file in `backend/` directory:

```env
PORT=8000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/printhub
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PASS=your_app_password
MAIL_FROM_NAME=Printhub

# Cloudinary (Image Hosting)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (Payment)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### 2c. Start Backend Server
```bash
npm run dev
```

Backend will run on `http://localhost:8000`

---

### Step 3: Frontend Setup

#### 3a. Navigate to Frontend
```bash
cd ../frontend
```

#### 3b. Install Frontend Dependencies
```bash
npm install
```

#### 3c. Configure Environment Variables
Create `.env.local` file in `frontend/` directory:

```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_SOCKET_URL=http://localhost:8000
```

#### 3d. Start Frontend Development Server
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## 📱 Opening the Application

1. **Frontend**: Open browser to `http://localhost:3000`
2. **Backend API**: `http://localhost:8000/api/v1`
3. **Backend Docs**: Check routes in `backend/routes/`

---

## 🔧 Configuring External Services

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Update `MONGODB_URL` in backend `.env`

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy API credentials
4. Update `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in backend `.env`

### Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com)
2. Go to Settings > API Keys
3. Copy Key ID and Key Secret
4. Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in backend `.env`

### Email Configuration

1. Use Gmail with [App Passwords](https://myaccount.google.com/apppasswords)
2. Or any SMTP provider credentials
3. Update email configuration in backend `.env`

---

## ✅ Testing the Application

### 1. User Registration
```
- Go to http://localhost:3000/register
- Create new account
- Verify email (check terminal for OTP in dev mode)
```

### 2. Design Upload
```
- Login to account
- Navigate to /upload
- Upload a design image
- Fill in details (title, price, category)
```

### 3. Design Gallery
```
- Go to /gallery
- Browse designs
- Add to cart
```

### 4. Checkout
```
- Go to /checkout
- Review cart
- Proceed to payment (Razorpay test mode)
```

### 5. Orders
```
- Go to /orders
- View order history
- Track order status
```

---

## 🏗️ Project Architecture

### Frontend Structure
```
frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── store/          # Redux slices
│   ├── services/       # API & Socket
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Helper functions
│   └── types/          # TypeScript interfaces
```

### Backend Structure
```
backend/
├── controllers/        # Business logic
├── models/            # Database schemas
├── routes/            # API endpoints
├── middleware/        # Auth, upload, etc
├── services/          # External services
├── database/          # Database connection
└── config/            # Configuration
```

---

## 🔌 API Endpoints

### User Endpoints
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user
- `POST /api/v1/user/logout` - Logout user
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update profile
- `GET /api/v1/user/get-user/:userId` - Get user by ID

### Design Endpoints
- `GET /api/v1/design/all` - Get all designs
- `POST /api/v1/design/upload` - Upload design

### Order Endpoints
- `GET /api/v1/order/my-orders` - Get user orders
- `POST /api/v1/order/create` - Create order

### Payment Endpoints
- `POST /api/v1/payment/create-order` - Create payment order
- `POST /api/v1/payment/verify` - Verify payment

### Chat
- WebSocket connection at `/socket.io`
- Event: `sendMessage` - Send message
- Event: `receiveMessage` - Receive message

---

## 🎨 Frontend Features

### Dashboard
- Revenue analytics
- Order statistics
- Recent orders list
- Performance metrics

### Design Gallery
- Advanced search & filters
- Like/favorite functionality
- Responsive grid layout
- Quick add to cart

### Shopping Cart
- Add/remove items
- Quantity management
- Price calculation
- Persistent storage

### Checkout
- Multiple payment methods
- Order summary
- Shipping calculations
- Tax calculation

### User Profile
- Edit personal information
- Manage addresses
- View order history
- Account settings

### Real-time Chat
- WebSocket events
- Message history
- User presence
- Real-time updates

---

## 🔒 Authentication Flow

1. **Registration**
   - User submits email & password
   - Email verification OTP sent
   - User verified and account created

2. **Login**
   - User enters credentials
   - Backend validates
   - JWT token issued
   - Token stored in localStorage

3. **Protected Routes**
   - ProtectedRoute component checks auth
   - Redirects to login if not authenticated
   - Token added to API requests

4. **Token Management**
   - Stored in localStorage
   - Auto-added to request headers
   - Automatically cleared on 401
   - Redirects to login on expiry

---

## 🎯 Development Workflow

### Adding a New Page

1. Create page component in `frontend/src/pages/`
2. Add route in `frontend/src/App.tsx`
3. Create Redux slice if needed
4. Use components and hooks
5. Style with Tailwind CSS

### Creating Redux Actions

1. Create slice in `frontend/src/store/slices/`
2. Define async thunks
3. Handle pending/fulfilled/rejected states
4. Export actions and reducer
5. Add to store in `index.ts`

### API Integration

1. Use `api` client from `services/api.ts`
2. Add interceptors for auth
3. Handle errors with toast notifications
4. Use Redux for state management

---

## 📚 Tech Stack Details

### Frontend Technologies
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Socket.io** - Real-time communication
- **Recharts** - Data visualization

### Backend Technologies
- **Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image hosting
- **Razorpay** - Payments
- **Socket.io** - Real-time features
- **Nodemailer** - Email service

---

## 🐛 Troubleshooting

### Frontend Issues

**Port 3000 already in use**
```bash
# Kill process on port 3000
npx kill-port 3000
```

**Cannot connect to backend**
- Ensure backend is running on port 8000
- Check VITE_API_URL in .env.local
- Check browser console for CORS errors

**Redux state not updating**
- Check Redux DevTools
- Verify reducer logic
- Check action dispatch

### Backend Issues

**MongoDB connection error**
- Verify connection string
- Check network access whitelist in Atlas
- Verify credentials

**Cloudinary upload failing**
- Check API credentials
- Verify folder settings
- Check file size limits

**Email not sending**
- Verify SMTP credentials
- Enable "Less secure app access" for Gmail
- Check email configuration

---

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend Deployment (Heroku/Railway)
```bash
# Set environment variables
# Deploy repository
```

---

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

Proprietary - All rights reserved

---

## 🎉 Next Steps

1. ✅ Setup MongoDB Atlas
2. ✅ Configure Cloudinary
3. ✅ Setup Razorpay
4. ✅ Install dependencies
5. ✅ Start development servers
6. ✅ Create test account
7. ✅ Upload test design
8. ✅ Test checkout flow
9. ✅ Customize branding
10. ✅ Deploy to production

---

**For questions or support, contact the development team.**

Built with ❤️ for Printhub

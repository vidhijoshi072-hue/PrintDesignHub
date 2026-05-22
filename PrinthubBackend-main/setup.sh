#!/bin/bash

# Printhub Development Setup Script

echo "🚀 Setting up Printhub Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Backend Setup
echo ""
echo "📦 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Please create backend/.env with the following keys:"
    echo "  - MONGODB_URL"
    echo "  - JWT_SECRET"
    echo "  - CLOUDINARY_NAME"
    echo "  - RAZORPAY_KEY_ID"
fi

cd ..

# Frontend Setup
echo ""
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

if [ ! -f ".env.local" ]; then
    echo "⚠️  No .env.local file found. Creating from example..."
    cp .env.example .env.local
    echo "✅ Created .env.local - please update with your configuration"
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Update backend/.env with your configuration"
echo "  2. Update frontend/.env.local if needed"
echo "  3. Start backend: cd backend && npm run dev"
echo "  4. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:8000"

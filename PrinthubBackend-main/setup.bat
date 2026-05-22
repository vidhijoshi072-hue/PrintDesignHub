@echo off
REM Printhub Development Setup Script for Windows

echo 🚀 Setting up Printhub Development Environment...

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    exit /b 1
)

echo ✅ Node.js version:
node -v
echo ✅ npm version:
npm -v

REM Backend Setup
echo.
echo 📦 Setting up Backend...
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo ✅ Backend dependencies already installed
)

if not exist ".env" (
    echo ⚠️  No .env file found. Please create backend\.env with the following keys:
    echo   - MONGODB_URL
    echo   - JWT_SECRET
    echo   - CLOUDINARY_NAME
    echo   - RAZORPAY_KEY_ID
)

cd ..

REM Frontend Setup
echo.
echo 📦 Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo ✅ Frontend dependencies already installed
)

if not exist ".env.local" (
    echo ⚠️  No .env.local file found. Creating from example...
    copy .env.example .env.local
    echo ✅ Created .env.local - please update with your configuration
)

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo 📝 Next steps:
echo   1. Update backend\.env with your configuration
echo   2. Update frontend\.env.local if needed
echo   3. Start backend: cd backend ^&^& npm run dev
echo   4. Start frontend: cd frontend ^&^& npm run dev
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔌 Backend: http://localhost:8000
echo.
pause

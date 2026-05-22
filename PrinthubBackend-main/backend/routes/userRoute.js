import express from 'express';
import { allUsers, register, reVerify, login, logout, forgotPassword, verifyOTP, changePassword, getUserById, verify } from '../controllers/userController.js';
import { isadmin, isAuthenticated } from '../middleware/isAuthenticated.js';


const router = express.Router();

router.post('/register', register)
router.post('/verify', verify)
router.post('/re-verify', reVerify)
router.post('/login', login)
router.post('/logout',isAuthenticated, logout)
router.post('/forgot-password', isAuthenticated, forgotPassword)
router.post('/verify-otp/:email', verifyOTP)
router.post('/change-password/:email', changePassword)
router.get('/all-users',isAuthenticated, isadmin, allUsers)
router.get('/get-user/:userId', isAuthenticated, getUserById)

export default router;
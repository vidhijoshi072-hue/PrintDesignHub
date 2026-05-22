import User  from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {verifyEmail} from '../emailVerify/verifyEmail.js';
import { sendOTPEmail } from '../emailVerify/sendOTPMail.js';
import { Session } from '../models/sessionModel.js';


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" });
        }
        
        // Split name into firstName and lastName
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || nameParts[0];
        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            firstName,
            lastName,
            email,
            password:hashedPassword
            // isVerified will default to false - requires email verification
        });
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '20m' });
        verifyEmail(token, email); // Send verification email
        newUser.token = token;
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({
                success: false,
                message: "Authorization header missing or malformed"
            });
        }
        const token = authHeader.split(' ')[1];// [bearer, gfghfhxdfccfhchhhj]
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(400).json({
                    success: false,
                    message: "Token expired" 
                });
            }
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        user.token = null;
        user.isVerified = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const reVerify = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '20m' });
        verifyEmail(token, email);
        user.token = token;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Verification email sent again successfully",
            token: user.token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const exisitingUser = await User.findOne({ email });
        if (!exisitingUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, exisitingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }
        if (!exisitingUser.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Verify your email first"
            });
        }
        //genrate token
        const accessToken = jwt.sign({ id: exisitingUser._id }, process.env.SECRET_KEY, { expiresIn: '10d' });
        const refreshToken = jwt.sign({ id: exisitingUser._id }, process.env.SECRET_KEY, { expiresIn: '30d' });

        exisitingUser.isLoggedIn = true;
        await exisitingUser.save();

        //User for existing session and delete it before creating new session
        const existingSession = await Session.findOne({ userId: exisitingUser._id });
        if (existingSession) {
            await Session.deleteOne({ userId: exisitingUser._id });
        }

        //Create new session
        await Session.create({ userId: exisitingUser._id });
        return res.status(200).json({
            success: true,
            message:"welcome back",
            user: exisitingUser,
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        const userId = req.id;
        await Session.deleteMany({ userId: userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:error.message
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
      user.otp = otp;
      user.otpExpiration = otpExpiration;

      await user.save();

        //send otp to email
        await sendOTPEmail(otp, email);

        return res.status(200).json({
            success: true,
            message: "OTP sent to email"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const verifyOTP = async (req, res) => {
    try{
        const {otp} = req.body;
        const email = req.params.email;

        if(!otp){
            return res.status(400).json({
                success: false,
                message: "OTP is required"
            });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        if(!user.otp || !user.otpExpiration){
            return res.status(400).json({
                success: false,
                message: "OTP is not generated for this email"
            });
        }
        if(user.otpExpiration < new Date()){
            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });
        }
        if(user.otp !== otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        user.otp = null;
        user.otpExpiration = null;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });
    }catch(error){  
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const changePassword = async (req, res) => {
    try{
    const { newPassword, confirmPassword } = req.body;
    const email = req.params.email;
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }
    if(!newPassword || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields"
        });
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Passwords do not match"
        });
    }
 const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select('-password -otp -otpExpiration');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message:error.message
        });
    }
};


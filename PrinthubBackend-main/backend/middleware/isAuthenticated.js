import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

export const isAuthenticated = async (req, res, next) => {
    try{
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({
        success: false,
        message: "Authorization header missing or malformed"
    });
}
const token = authHeader.split(' ')[1];
let decoded;
try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
} catch (err) {
    if (err.name === 'TokenExpiredError') {
        return res.status(400).json({
            success: false,
            message: "The registration token has expired. Please register again."
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
req.user = user;
req.id = user._id;
next();
    }catch(error){
        res.status(500).json({
            success: false,
            message:error.message
        });
    }
};
      
export const  isadmin = async (req, res, next) => {
    if(req.user && req.user.role === 'admin'){
        next();
    }else{
        res.status(403).json({
            success: false,
            message: "Unauthorized, admin access only"
        });
    }
}
export default isAuthenticated;
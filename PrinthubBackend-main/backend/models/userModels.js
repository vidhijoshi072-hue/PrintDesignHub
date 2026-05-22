import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    isAdmin:{type: Boolean, default: false},
    role:
    {type: String,
enum: ['admin', 'user'],
default: 'user'},
    token:{type: String, default: null},
    isVerified:{type: Boolean, default: false},
    isLoggedIn:{type: Boolean, default: false},
    otp:{type: String, default: null},
    otpExpiration:{type: Date, default: null},
    address:{type: String, default: null},
    city:{type: String, default: null},
    zipCode:{type: String, default: null},
    phoneNo:{type: String, default: null}
},
{timestamps: true}
);

const User = mongoose.model("User", userSchema);
export default User;
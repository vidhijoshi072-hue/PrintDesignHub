import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  design: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Design"
  },

  amount: {
    type: Number
  },

  paymentStatus: {
    type: String,
    default: "pending"
  }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
import Order from "../models/orderModels.js";

export const createOrder = async (req,res)=>{

 try{

 const {designId, amount} = req.body;

 const order = new Order({
  design:designId,
  company:req.user.id,
  amount,
  paymentStatus:"paid"
 });

 await order.save();

 res.json({
  success:true,
  order
 });

 }catch(error){
  res.status(500).json({message:error.message});
 }

};
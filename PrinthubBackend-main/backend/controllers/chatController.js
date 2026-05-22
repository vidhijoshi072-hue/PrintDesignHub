import Message from "../models/messageModel.js";

export const saveMessage = async (req,res)=>{

 try{

 const {receiver,message} = req.body;

 const newMessage = new Message({
  sender:req.user.id,
  receiver,
  message
 });

 await newMessage.save();

 res.json({
  success:true,
  newMessage
 });

 }catch(error){
  res.status(500).json({message:error.message});
 }

};
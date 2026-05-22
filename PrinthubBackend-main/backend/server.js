import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./database/db.js";
import userRoute from './routes/userRoute.js'
import designRoute from './routes/designRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import orderRoute from './routes/orderRoute.js'

import http from 'http'
import { Server } from 'socket.io'
import chatRoute from './routes/chatRoute.js';


const app = express()
const PORT = process.env.PORT || 8000
const server = http.createServer(app)
const frontendOrigins = (process.env.FRONTEND_URL || "http://localhost:3000,http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOptions = {
    origin(origin, callback) {
        if (!origin || frontendOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true
};

const io = new Server(server, {
    cors: {
        origin: frontendOrigins,
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use('/api/v1/design', designRoute)
app.use('/api/v1/payment', paymentRoute)
app.use('/api/v1/order', orderRoute)
app.use('/api/v1/chat', chatRoute)

app.use('/api/v1/user', userRoute)
//http://localhost:8000/api/v1/user/register
app.use('/api/v1/user/verify', userRoute)
//http://localhost:8000/api/v1/user/verify

connectDB()

server.listen(PORT, () => {
    console.log(`Server is  listening at port ${PORT}`);
})

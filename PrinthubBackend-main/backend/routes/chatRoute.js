import express from "express";
import {saveMessage} from "../controllers/chatController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/send",isAuthenticated,saveMessage);

export default router;
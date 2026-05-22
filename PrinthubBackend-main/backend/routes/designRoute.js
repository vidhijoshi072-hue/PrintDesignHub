import express from "express";
import { uploadDesign, getAllDesigns } from "../controllers/designController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/upload", isAuthenticated, upload.single("image"), uploadDesign);
router.get("/all", getAllDesigns);

export default router;
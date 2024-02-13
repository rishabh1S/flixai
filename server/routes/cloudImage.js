import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/", async (req, res) => {
  try {
    const { imageURI, folderName } = req.body;

    const result = await cloudinary.uploader.upload(imageURI, {
      folder: folderName,
    });

    res.json({ cloudinaryURL: result.secure_url });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

import express from "express";
import Post from "../mongo/models/post.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { username, userProfileUri, imageURL, prompt, createdAt } = req.body;

    const existingPost = await Post.findOne({ tempImageURL: imageURL });

    if (existingPost) {
      res.status(404).json({ success: false, message: "Duplicate image post" });
      return;
    }

    const photoUrl = await cloudinary.uploader.upload(imageURL, {
      folder: "flixai/post-upload",
    });

    const newPost = await Post.create({
      username,
      userProfileUri,
      imageURL: photoUrl.secure_url,
      tempImageURL: imageURL,
      prompt,
      createdAt,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ success: false, message: err });
  }
});

export default router;

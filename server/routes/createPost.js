import express from "express";
import Post from "../mongo/models/post.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { description, imageUri } = req.body;

    const newPost = new Post({
      description,
      imageUri,
    });

    const savedPost = await newPost.save();

    res.json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

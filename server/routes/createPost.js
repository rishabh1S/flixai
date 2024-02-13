import express from "express";
import Post from "../mongo/models/post.js";
import User from "../mongo/models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userDataId, description, imageUri } = req.body;

    const newPost = new Post({
      userData: userDataId,
      description,
      imageUri,
    });

    const savedPost = await newPost.save();

    await User.findByIdAndUpdate(userDataId, {
      $push: { createdPostIds: savedPost._id },
    });

    res.json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

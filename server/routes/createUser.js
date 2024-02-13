import express from "express";
import User from "../mongo/models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { fullname, emailAddress, username } = req.body;

    const newUser = new User({
      fullname,
      emailAddress,
      username,
    });

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

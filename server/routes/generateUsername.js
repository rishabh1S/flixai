import express from "express";
import { generateUsername } from "unique-username-generator";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const uniqueUsername = generateUsername("", 0, 15);
    res.json({ username: uniqueUsername });
  } catch (error) {
    console.error("Error generating unique username:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

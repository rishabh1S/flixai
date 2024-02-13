import express from "express";
import cors from "cors";

import connectDB from "./mongo/connect.js";
import generateImage from "./routes/generateImage.js";
import generateUsername from "./routes/generateUsername.js";
import createUser from "./routes/createUser.js";
import createPost from "./routes/createPost.js";
import cloudImage from "./routes/cloudImage.js";

const app = express();
app.use(cors());
const port = 8080;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to FlixAi!",
  });
});

app.use("/generateImage", generateImage);
app.use("/generateUsername", generateUsername);
app.use("/createUser", createUser);
app.use("/createPost", createPost);
app.use("/cloudImage", cloudImage);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () =>
      console.log(`Server is running at http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

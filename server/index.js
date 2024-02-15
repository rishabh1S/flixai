import express from "express";
import cors from "cors";

import connectDB from "./mongo/connect.js";
import fooocusImage from "./routes/fooocusRoutes.js";
import generateUsername from "./routes/generateUsername.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
app.use(cors());
const port = 8080;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to FlixAi!",
  });
});

app.use("/api/fooocus", fooocusImage);
app.use("/api/randomUser", generateUsername);
app.use("/api/post", postRoutes);

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

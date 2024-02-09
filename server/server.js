import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connectDB from "./mongo/connect.js";
import generateImage from "./routes/generateImage.js";

const app = express();
app.use(cors());
const port = 8080;

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to FlixAi!",
  });
});

app.use("/generateImage", generateImage);

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

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", taskRoutes);
app.get("/", (req, res) => {
  res.json("App is listening on api/");
  return;
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "TODO_APP",
  })
  .then(() => console.log("MongoDB connnected successfully"))
  .catch((error) => console.log(error.message));

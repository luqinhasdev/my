import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import digitalEntertainmentRoutes from "./routes/digitalEntertainment.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/digitalEntertainments", digitalEntertainmentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log("✅"));
  })
  .catch((err) => console.error(err));

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

import productsRoute from "./routes/productRoute.js";
import authroute from "./routes/authRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();
dotenv.config();

const port = parseInt(process.env.PORT, 10) || 5000;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//connect to database
const connectDb = async () => {
  const mongoUrl = process.env.DATABASE;
  try {
    await mongoose.connect(mongoUrl);
    console.log("Database Connected");
  } catch (error) {
    console.log("mongodb connection error", error);
    process.exit(1);
  }
};
connectDb();

app.use(express.json());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(
  cors({
    origin: "*", // Terima request dari mana saja (tidak direkomendasikan untuk production!)
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use("/api/auth", authroute);
app.use("/api/products", productsRoute);
app.use("/api/order", orderRoute);

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});

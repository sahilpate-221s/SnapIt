import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import configureCloudinary from "./config/cloudinary.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// use middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

// configure cloudinary
configureCloudinary();

// connect to database
connectDB();

//setting up router
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/collection", collectionRoutes);


// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

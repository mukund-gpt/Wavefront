import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.routes.js";
import postRoutes from "./Routes/post.routes.js";
import messageRoutes from "./Routes/message.routes.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/message", messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

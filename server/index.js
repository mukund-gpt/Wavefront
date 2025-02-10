import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import postRoutes from "./Routes/post.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.FRONTEND_URI,
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/message", messageRoutes);

app.get("/", (req, res) => {
  return res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

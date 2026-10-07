import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import setupSocket from "./socket/socketHandler.js";

const app = express();
const server = http.createServer(app);

const allowedClientOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const checkClientOrigin = (origin, callback) => {
  const isLocalDevelopmentOrigin =
    origin &&
    /^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(origin);

  callback(
    null,
    !origin ||
      allowedClientOrigins.includes(origin) ||
      Boolean(isLocalDevelopmentOrigin)
  );
};

const io = new Server(server, {
  cors: {
    origin: checkClientOrigin,
    methods: ["GET", "POST"]
  }
});

app.set("io", io);

app.use(
  cors({
    origin: checkClientOrigin
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Notification Dashboard API is running"
  });
});

app.use("/api/notifications", notificationRoutes);

app.use(errorHandler);

setupSocket(io);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();

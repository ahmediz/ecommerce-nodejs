import "dotenv/config";
import express from "express";
import { connectDB, disconnectDB } from "./data/db";
import authRoutes from "./routes/auth.routes";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", async () => {
  await disconnectDB();
  process.exit(1);
});

// Handle unhandled rejections
process.on("unhandledRejection", async () => {
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received. Shutting down gracefully...");
  await disconnectDB();
  process.exit(0);
});

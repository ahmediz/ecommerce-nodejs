import "dotenv/config";
import express from "express";
import { connectDB, disconnectDB } from "./data/db";
import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/products.routes";
import categoriesRoutes from "./routes/categories.routes";
import brandsRoutes from "./routes/brands.routes";
import cors from "cors";
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/brands", brandsRoutes);

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

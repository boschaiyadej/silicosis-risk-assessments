import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import workerRouter from "./routes/workerRouter.mjs";
import riskRouter from "./routes/riskRouter.mjs";
import { swaggerSpec, swaggerUi } from "./config/swagger.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/workers", workerRouter);
app.use("/api/risk", riskRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

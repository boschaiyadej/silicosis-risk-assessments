import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import workerRouter from "./routes/workerRouter.mjs";
import riskRouter from "./routes/riskRouter.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

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

// Event listeners for connection status
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Routes
app.use("/api/workers", workerRouter);
app.use("/api/risk", riskRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

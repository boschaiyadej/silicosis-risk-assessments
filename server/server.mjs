import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import AutoIncrementFactory from "mongoose-sequence";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const AutoIncrement = AutoIncrementFactory(mongoose);

const workerSchema = new mongoose.Schema(
  {
    _id: Number,
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    idNumber: String,
    residenceSeparation: String,
    position: String,
    silicaDust: Number,
    workingHours: Number,
    workingWeeks: Number,
    workingYears: Number,
    workAddress: String,
    bodyWeight: Number,
    bodyHeight: Number,
    underlyingDiseases: String,
  },
  {
    collection: "worker_data",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

workerSchema.plugin(AutoIncrement, { id: "worker_seq", inc_field: "_id" });

const Worker = mongoose.model("Worker", workerSchema, "worker_data");

// CREATE: Add a new worker
app.post("/api/workers", async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    await newWorker.save();
    res.status(201).send("Worker data saved");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// READ: Get all workers
app.get("/api/workers", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// READ: Get a single worker by ID
app.get("/api/workers/:id", async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).send("Worker not found");
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// UPDATE: Update a worker by ID
app.put("/api/workers/:id", async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWorker) {
      return res.status(404).send("Worker not found");
    }
    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// DELETE: Delete a worker by ID
app.delete("/api/workers/:id", async (req, res) => {
  try {
    const deletedWorker = await Worker.findByIdAndDelete(req.params.id);
    if (!deletedWorker) {
      return res.status(404).send("Worker not found");
    }
    res.status(200).send("Worker data deleted");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express from "express";
import Worker from "../models/workerModel.mjs";

const router = express.Router();

// POST: Create a new worker
router.post("/", async (req, res) => {
  const {
    gender,
    firstName,
    lastName,
    age,
    idNumber,
    nation,
    workingWeeks,
    workingYears,
    workAddress,
    bodyWeight,
    bodyHeight,
    bmi,
  } = req.body;

  try {
    const newWorker = new Worker({
      gender,
      firstName,
      lastName,
      age,
      idNumber,
      nation,
      workingWeeks,
      workingYears,
      workAddress, // Optional
      bodyWeight,
      bodyHeight,
      bmi,
    });

    await newWorker.save();
    res.status(201).send("Worker data saved successfully");
  } catch (error) {
    console.error("Error saving worker data:", error);
    res.status(500).send("Server error");
  }
});

// GET: Retrieve all workers
router.get("/", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    console.error("Error fetching workers:", error);
    res.status(500).send("Server error");
  }
});

// GET: Retrieve a worker by ID
router.get("/:id", async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).send("Worker not found");
    }
    res.status(200).json(worker);
  } catch (error) {
    console.error("Error fetching worker:", error);
    res.status(500).send("Server error");
  }
});

// PUT: Update worker data by ID
router.put("/:id", async (req, res) => {
  const {
    gender,
    firstName,
    lastName,
    age,
    idNumber,
    nation,
    workingWeeks,
    workingYears,
    workAddress,
    bodyWeight,
    bodyHeight,
    bmi,
  } = req.body;

  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      {
        gender,
        firstName,
        lastName,
        age,
        idNumber,
        nation,
        workingWeeks,
        workingYears,
        workAddress,
        bodyWeight,
        bodyHeight,
        bmi,
      },
      { new: true }
    );

    if (!updatedWorker) {
      return res.status(404).send("Worker not found");
    }

    res.status(200).json(updatedWorker);
  } catch (error) {
    console.error("Error updating worker data:", error);
    res.status(500).send("Server error");
  }
});

// DELETE: Remove worker by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedWorker = await Worker.findByIdAndDelete(req.params.id);

    if (!deletedWorker) {
      return res.status(404).send("Worker not found");
    }

    res.status(200).send("Worker data deleted successfully");
  } catch (error) {
    console.error("Error deleting worker data:", error);
    res.status(500).send("Server error");
  }
});

export default router;

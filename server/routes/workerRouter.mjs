import express from "express";
import Worker from "../models/workerModel.mjs";

const router = express.Router();

// POST: Create a new worker with risk data
router.post("/", async (req, res) => {
  const {
    gender,
    firstName,
    lastName,
    age,
    idNumber,
    nation,
    workingHours,
    workingWeeks,
    workingYears,
    workAddress,
    residenceSeparation,
    bodyWeight,
    bodyHeight,
    bmi,
    underlyingDiseases,
    riskData,
  } = req.body;

  try {
    const newWorker = new Worker({
      gender,
      firstName,
      lastName,
      age,
      idNumber,
      nation,
      workingHours,
      workingWeeks,
      workingYears,
      workAddress,
      residenceSeparation,
      bodyWeight,
      bodyHeight,
      bmi,
      underlyingDiseases,
      riskData,
    });

    await newWorker.save();
    res.status(201).json(newWorker); // Return created worker object
  } catch (error) {
    console.error("Error saving worker and risk data:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET: Retrieve all workers
router.get("/", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    console.error("Error fetching workers:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET: Retrieve a worker by ID
router.get("/:id", async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json(worker);
  } catch (error) {
    console.error("Error fetching worker:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// PUT: Update worker data by ID (partial updates allowed)
router.put("/:id", async (req, res) => {
  const updateFields = req.body;

  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json(updatedWorker);
  } catch (error) {
    console.error("Error updating worker and risk data:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// DELETE: Remove worker by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedWorker = await Worker.findByIdAndDelete(req.params.id);

    if (!deletedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json({ message: "Worker data deleted successfully" });
  } catch (error) {
    console.error("Error deleting worker data:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

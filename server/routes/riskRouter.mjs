import express from "express";
import Risk from "../models/riskModel.mjs";
import Worker from "../models/workerModel.mjs";

const router = express.Router();

// Create Risk Data
router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    position,
    silicaDust,
    workingHours,
    underlyingDiseases,
    residenceSeparation,
    riskScore,
    riskLevel,
  } = req.body;

  try {
    const worker = await Worker.findOne({ firstName, lastName });

    if (!worker) {
      return res.status(404).send("Worker not found");
    }

    const newRisk = new Risk({
      worker: worker._id,
      position,
      silicaDust,
      workingHours,
      underlyingDiseases,
      residenceSeparation,
      riskScore,
      riskLevel,
    });

    await newRisk.save();
    res.status(201).send("Risk data saved successfully");
  } catch (error) {
    console.error("Error saving risk data:", error);
    res.status(500).send("Server error");
  }
});

// Get All Risk Data
router.get("/", async (req, res) => {
  try {
    const risks = await Risk.find().populate("worker");
    res.status(200).json(risks);
  } catch (error) {
    console.error("Error retrieving risk data:", error);
    res.status(500).send("Server error");
  }
});

// Get Risk Data by ID
router.get("/:id", async (req, res) => {
  try {
    const risk = await Risk.findById(req.params.id).populate("worker");
    if (!risk) {
      return res.status(404).send("Risk data not found");
    }
    res.status(200).json(risk);
  } catch (error) {
    console.error("Error retrieving risk data:", error);
    res.status(500).send("Server error");
  }
});

// Update Risk Data
router.put("/:id", async (req, res) => {
  const {
    position,
    silicaDust,
    workingHours,
    underlyingDiseases,
    residenceSeparation,
    riskScore,
    riskLevel,
  } = req.body;

  try {
    const updatedRisk = await Risk.findByIdAndUpdate(
      req.params.id,
      {
        position,
        silicaDust,
        workingHours,
        underlyingDiseases,
        residenceSeparation,
        riskScore,
        riskLevel,
      },
      { new: true }
    ).populate("worker");

    if (!updatedRisk) {
      return res.status(404).send("Risk data not found");
    }

    res.status(200).json(updatedRisk);
  } catch (error) {
    console.error("Error updating risk data:", error);
    res.status(500).send("Server error");
  }
});

// Delete Risk Data
router.delete("/:id", async (req, res) => {
  try {
    const deletedRisk = await Risk.findByIdAndDelete(req.params.id);

    if (!deletedRisk) {
      return res.status(404).send("Risk data not found");
    }

    res.status(200).send("Risk data deleted successfully");
  } catch (error) {
    console.error("Error deleting risk data:", error);
    res.status(500).send("Server error");
  }
});

export default router;

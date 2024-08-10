import express from "express";
import Worker from "../models/riskModel.mjs";

const router = express.Router();

router.put("/", async (req, res) => {
  const {
    firstName,
    lastName,
    underlyingDiseases,
    residenceSeparation,
    riskData,
  } = req.body;

  try {
    // Find worker by firstName and lastName
    const worker = await Worker.findOne({ firstName, lastName });

    if (!worker) {
      return res.status(404).send("Worker not found");
    }

    // Update worker's underlyingDiseases and residenceSeparation
    worker.underlyingDiseases = underlyingDiseases;
    worker.residenceSeparation = residenceSeparation;

    // Add new riskData to worker
    if (Array.isArray(riskData) && riskData.length > 0) {
      worker.riskData.push(...riskData);
    }

    // Save updated worker document
    worker.updatedAt = new Date(); // Update the timestamp
    const updatedWorker = await worker.save();

    res.status(200).json(updatedWorker);
  } catch (error) {
    console.error("Error updating worker and adding risk data:", error);
    res.status(500).send("Server error");
  }
});

export default router;

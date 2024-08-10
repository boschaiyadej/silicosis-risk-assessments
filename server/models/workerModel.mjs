import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    gender: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    idNumber: { type: String },
    nation: { type: String, required: true },
    workingHours: { type: Number, required: true },
    workingWeeks: { type: Number, required: true },
    workingYears: { type: Number, required: true },
    workAddress: { type: String },
    residenceSeparation: { type: String, required: true },
    bodyWeight: { type: Number, required: true },
    bodyHeight: { type: Number, required: true },
    bmi: { type: Number, required: true },
    underlyingDiseases: { type: String, required: true },
    riskData: [
      {
        position: { type: String, required: true },
        silicaDust: { type: Number, required: true },
        riskScore: { type: Number, required: true },
        riskLevel: { type: Number, required: true },
        assessedAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: "worker_data",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Worker = mongoose.model("Worker", workerSchema, "worker_data");

export default Worker;

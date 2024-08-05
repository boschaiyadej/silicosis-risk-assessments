import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    gender: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    idNumber: { type: String, required: true },
    nation: { type: String, required: true },
    workingWeeks: { type: Number, required: true },
    workingYears: { type: Number, required: true },
    workAddress: { type: String },
    bodyWeight: { type: Number, required: true },
    bodyHeight: { type: Number, required: true },
    bmi: { type: String, required: true },
  },
  {
    collection: "worker_data",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Worker = mongoose.model("Worker", workerSchema, "worker_data");

export default Worker;

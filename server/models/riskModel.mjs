import mongoose from "mongoose";

const riskDataSchema = new mongoose.Schema(
  {
    position: { type: String, required: true },
    silicaDust: { type: Number, required: true },
    riskScore: { type: Number, required: true },
    riskLevel: { type: Number, required: true },
    assessedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const workerSchema = new mongoose.Schema({
  gender: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: Number,
  idNumber: String,
  nation: String,
  workingHours: Number,
  workingWeeks: Number,
  workingYears: Number,
  workAddress: String,
  residenceSeparation: String,
  bodyWeight: Number,
  bodyHeight: Number,
  bmi: Number,
  underlyingDiseases: String,
  riskData: [riskDataSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Worker = mongoose.models.Worker || mongoose.model("Worker", workerSchema);

export default Worker;

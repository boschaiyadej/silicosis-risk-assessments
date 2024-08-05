import mongoose from "mongoose";

const riskSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    position: { type: String, required: true },
    silicaDust: { type: Number, required: true },
    workingHours: { type: Number, required: true },
    underlyingDiseases: { type: String },
    residenceSeparation: { type: String, required: true },
    riskScore: { type: Number, required: true },
    riskLevel: { type: Number, required: true },
  },
  {
    collection: "risk_data",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Risk = mongoose.model("Risk", riskSchema, "risk_data");

export default Risk;

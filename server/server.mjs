import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import riskRouter from "./routes/riskRouter.mjs";
import workerRouter from "./routes/workerRouter.mjs";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/risk", riskRouter);
app.use("/api/worker", workerRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

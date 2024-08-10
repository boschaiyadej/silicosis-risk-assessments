import express from "express";
import Worker from "../models/workerModel.mjs";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Worker:
 *       type: object
 *       required:
 *         - gender
 *         - firstName
 *         - lastName
 *         - age
 *         - nation
 *         - workingHours
 *         - workingWeeks
 *         - workingYears
 *         - residenceSeparation
 *         - bodyWeight
 *         - bodyHeight
 *         - bmi
 *         - underlyingDiseases
 *       properties:
 *         gender:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         age:
 *           type: integer
 *         idNumber:
 *           type: string
 *         nation:
 *           type: string
 *         workingHours:
 *           type: integer
 *         workingWeeks:
 *           type: integer
 *         workingYears:
 *           type: integer
 *         workAddress:
 *           type: string
 *         residenceSeparation:
 *           type: string
 *         bodyWeight:
 *           type: integer
 *         bodyHeight:
 *           type: integer
 *         bmi:
 *           type: number
 *         underlyingDiseases:
 *           type: string
 *         riskData:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *               silicaDust:
 *                 type: number
 *               riskScore:
 *                 type: number
 *               riskLevel:
 *                 type: number
 *               assessedAt:
 *                 type: string
 *                 format: date-time
 *       example:
 *         gender: male
 *         firstName: John
 *         lastName: Doe
 *         age: 30
 *         idNumber: "123456789"
 *         nation: USA
 *         workingHours: 40
 *         workingWeeks: 50
 *         workingYears: 10
 *         workAddress: "123 Main St, City, Country"
 *         residenceSeparation: married
 *         bodyWeight: 80
 *         bodyHeight: 175
 *         bmi: 26.1
 *         underlyingDiseases: none
 *         riskData:
 *           - position: miner
 *             silicaDust: 10
 *             riskScore: 8
 *             riskLevel: 2
 */

// POST: Create a new worker with risk data
/**
 * @swagger
 * /api/workers:
 *   post:
 *     summary: Create a new worker
 *     description: Create a new worker with risk data.
 *     tags: [Workers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Worker'
 *     responses:
 *       201:
 *         description: Worker created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Worker'
 *       500:
 *         description: Server error
 */
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
    res.status(201).json(newWorker);
  } catch (error) {
    console.error("Error saving worker and risk data:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET: Retrieve all workers
/**
 * @swagger
 * /api/workers:
 *   get:
 *     summary: Get all workers
 *     description: Retrieve a list of all workers.
 *     tags: [Workers]
 *     responses:
 *       200:
 *         description: List of workers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Worker'
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /api/workers/{id}:
 *   get:
 *     summary: Get worker by ID
 *     description: Retrieve a worker by ID.
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Worker details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Worker'
 *       404:
 *         description: Worker not found
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /api/workers/{id}:
 *   put:
 *     summary: Update worker by ID
 *     description: Update worker data by ID. Allows partial updates.
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Worker'
 *     responses:
 *       200:
 *         description: Worker updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Worker'
 *       404:
 *         description: Worker not found
 *       500:
 *         description: Server error
 */
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
/**
 * @swagger
 * /api/workers/{id}:
 *   delete:
 *     summary: Delete worker by ID
 *     description: Remove a worker by ID.
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Worker deleted successfully
 *       404:
 *         description: Worker not found
 *       500:
 *         description: Server error
 */
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

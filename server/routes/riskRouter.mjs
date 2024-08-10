import express from "express";
import Worker from "../models/riskModel.mjs";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Risk:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - workingHours
 *         - residenceSeparation
 *         - underlyingDiseases
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         workingHours:
 *           type: integer
 *         residenceSeparation:
 *           type: string
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
 *         firstName: John
 *         lastName: Doe
 *         workingHours: 8
 *         residenceSeparation: "แยกจากที่พักอาศัย"
 *         underlyingDiseases: "none"
 *         riskData:
 *           - position: "ขุดหิน (ลงบ่อหิน)"
 *             silicaDust: 0.05
 *             riskScore: 8
 *             riskLevel: 2
 */

/**
 * @swagger
 * /api/risk/{firstName}/{lastName}/riskData:
 *   get:
 *     summary: Get specific risk data by first name and last name
 *     description: Retrieve only the risk data for a worker.
 *     tags: [Risk]
 *     parameters:
 *       - in: path
 *         name: firstName
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lastName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Risk data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   position:
 *                     type: string
 *                   silicaDust:
 *                     type: number
 *                   riskScore:
 *                     type: number
 *                   riskLevel:
 *                     type: number
 *                   assessedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Worker not found
 *       500:
 *         description: Server error
 */
router.get("/:firstName/:lastName/riskData", async (req, res) => {
  const { firstName, lastName } = req.params;

  try {
    const worker = await Worker.findOne({ firstName, lastName });

    if (!worker) {
      return res.status(404).send("Worker not found");
    }

    res.status(200).json(worker.riskData);
  } catch (error) {
    console.error("Error fetching risk data:", error);
    res.status(500).send("Server error");
  }
});

/**
 * @swagger
 * /api/risk/{firstName}/{lastName}:
 *   put:
 *     summary: Update a worker's risk data by first name and last name
 *     description: Update a worker's risk assessment data.
 *     tags: [Risk]
 *     parameters:
 *       - in: path
 *         name: firstName
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lastName
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               underlyingDiseases:
 *                 type: string
 *               residenceSeparation:
 *                 type: string
 *               riskData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     position:
 *                       type: string
 *                     silicaDust:
 *                       type: number
 *                     riskScore:
 *                       type: number
 *                     riskLevel:
 *                       type: number
 *                     assessedAt:
 *                       type: string
 *                       format: date-time
 *     responses:
 *       200:
 *         description: Worker updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Risk'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Worker not found
 *       500:
 *         description: Server error
 */
router.put("/:firstName/:lastName", async (req, res) => {
  const { firstName, lastName } = req.params;
  const { underlyingDiseases, residenceSeparation, riskData } = req.body;

  if (!Array.isArray(riskData) || riskData.length === 0) {
    return res.status(400).send("Risk data must be a non-empty array");
  }

  try {
    const worker = await Worker.findOne({ firstName, lastName });

    if (!worker) {
      return res.status(404).send("Worker not found");
    }

    // Update fields
    if (underlyingDiseases !== undefined) {
      worker.underlyingDiseases = underlyingDiseases;
    }
    if (residenceSeparation !== undefined) {
      worker.residenceSeparation = residenceSeparation;
    }
    if (riskData) {
      worker.riskData.push(...riskData);
    }

    // Update the timestamp
    worker.updatedAt = new Date();

    const updatedWorker = await worker.save();
    res.status(200).json(updatedWorker);
  } catch (error) {
    console.error("Error updating worker:", error);
    res.status(500).send("Server error");
  }
});

/**
 * @swagger
 * /api/risk/{firstName}/{lastName}/riskData/{riskDataId}:
 *   delete:
 *     summary: Delete specific risk data by first name, last name, and riskData ID
 *     description: Delete a specific risk data entry for a worker by its ID.
 *     tags: [Risk]
 *     parameters:
 *       - in: path
 *         name: firstName
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: lastName
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: riskDataId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Risk data deleted successfully
 *       404:
 *         description: Worker or risk data not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:firstName/:lastName/riskData/:riskDataId",
  async (req, res) => {
    const { firstName, lastName, riskDataId } = req.params;

    try {
      // Find the worker by firstName and lastName
      const worker = await Worker.findOne({ firstName, lastName });

      if (!worker) {
        return res.status(404).send("Worker not found");
      }

      // Check if the riskDataId exists
      const initialLength = worker.riskData.length;
      worker.riskData = worker.riskData.filter(
        (data) => data._id.toString() !== riskDataId
      );

      if (worker.riskData.length === initialLength) {
        return res.status(404).send("Risk data not found");
      }

      // Save the updated worker document
      worker.updatedAt = new Date();
      await worker.save();

      res.status(200).send("Risk data deleted successfully");
    } catch (error) {
      console.error("Error deleting risk data:", error);
      res.status(500).send("Server error");
    }
  }
);

export default router;

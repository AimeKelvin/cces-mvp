import express from "express";
import { getMyComplaints, respondToComplaint } from "../controllers/gov.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.get("/complaints", authMiddleware, getMyComplaints);
router.post("/complaints/:ticketId/respond", authMiddleware, respondToComplaint);
export default router;

import express from "express";
import { submitComplaint, trackComplaint } from "../controllers/citizen.controller.js";
const router = express.Router();
router.post("/complaints", submitComplaint);
router.get("/track/:ticketId", trackComplaint);
export default router;

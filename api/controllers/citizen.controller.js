import Complaint from "../models/Complaint.js";
import { classifyComplaint } from "../services/aiRouter.js";
import GovUser from "../models/GovUser.js";
import crypto from "crypto";

export const submitComplaint = async (req, res) => {
  const { title, description } = req.body;
  const text = `${title} ${description}`;
  const category = await classifyComplaint(text);

  const handler = await GovUser.findOne({ department: category }) || await GovUser.findOne({ department: "General" });
  const ticketId = crypto.randomBytes(4).toString("hex");

  const complaint = await Complaint.create({
    title,
    description,
    category,
    assignedTo: handler._id,
    ticketId
  });

  res.status(201).json({ ticketId, assignedTo: handler.name, category });
};

export const trackComplaint = async (req, res) => {
  const { ticketId } = req.params;
  const complaint = await Complaint.findOne({ ticketId }).populate("assignedTo", "name email");
  if (!complaint) return res.status(404).json({ error: "Not found" });
  res.json(complaint);
};

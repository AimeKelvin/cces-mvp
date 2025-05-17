import Complaint from "../models/Complaint.js";

export const getMyComplaints = async (req, res) => {
  const complaints = await Complaint.find({ assignedTo: req.gov.id });
  res.json(complaints);
};

export const respondToComplaint = async (req, res) => {
  const { ticketId } = req.params;
  const { response } = req.body;

  const complaint = await Complaint.findOneAndUpdate(
    { ticketId, assignedTo: req.gov.id },
    { response },
    { new: true }
  );

  if (!complaint) return res.status(404).json({ error: "Not found or not yours" });
  res.json(complaint);
};

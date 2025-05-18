import Complaint from '../models/Complaint.js';
import GovernmentUser from '../models/GovernmentUser.js';
import { categorizeComplaint } from '../services/classifier.service.js';
import { generateTicketId } from '../utils/ticket.util.js';

export const submitComplaint = async (req, res) => {
  const { title, description, senderName, location } = req.body;
  if (!title || !description || !senderName || !location)
    return res.status(400).json({ message: 'Missing fields' });

  const category = await categorizeComplaint(title, description);
  const gov = await GovernmentUser.findOne({ category });

  const complaint = await Complaint.create({
    title,
    description,
    senderName,
    location,
    category,
    assignedTo: gov?._id,
    ticketId: generateTicketId()
  });

  res.status(201).json({ ticketId: complaint.ticketId });
};

export const trackComplaint = async (req, res) => {
  const { ticketId } = req.params;
  const complaint = await Complaint.findOne({ ticketId }).populate('assignedTo', 'name category');

  if (!complaint) return res.status(404).json({ message: 'Ticket not found' });

  res.json({
    status: complaint.status,
    senderName: complaint.senderName,
    location: complaint.location,
    response: complaint.response,
    assignedTo: complaint.assignedTo?.name || 'Unassigned',
    category: complaint.category,
    title: complaint.title,
    description: complaint.description,
    createdAt: complaint.createdAt
  });
};


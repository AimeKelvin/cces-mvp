import GovernmentUser from '../models/GovernmentUser.js';
import { hashPassword, matchPassword, generateToken } from '../services/auth.service.js';

export const registerGov = async (req, res) => {
  const { name, email, password, category } = req.body;
  const exists = await GovernmentUser.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });

  const newUser = await GovernmentUser.create({
    name,
    email,
    category,
    password: await hashPassword(password)
  });

  res.status(201).json({ message: 'Account created', });
};

export const loginGov = async (req, res) => {
  const { email, password } = req.body;
  const user = await GovernmentUser.findOne({ email });
  if (!user || !(await matchPassword(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({ token });
};

export const getAssignedComplaints = async (req, res) => {
  const complaints = await (await import('../models/Complaint.js')).default.find({ assignedTo: req.gov.id });
  res.json(complaints);
};

export const respondToComplaint = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  const complaint = await (await import('../models/Complaint.js')).default.findOne({ _id: id, assignedTo: req.gov.id });
  if (!complaint) return res.status(404).json({ message: 'Not found' });

  complaint.response = response;
  complaint.status = 'Resolved';
  await complaint.save();

  res.json({ message: 'Response submitted' });
};

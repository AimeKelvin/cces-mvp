import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  title: String,
  description: String,
  senderName: String,
  location: {
    city: String,
    district: String,
    sector: String,
  },
  category: String,
  status: { type: String, default: 'pending' }, // pending, responded
  response: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GovernmentUser'
  }
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);

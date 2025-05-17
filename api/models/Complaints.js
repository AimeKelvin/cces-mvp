import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  ticketId: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'GovUser' },
  response: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Complaint', ComplaintSchema);

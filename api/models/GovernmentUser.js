import mongoose from 'mongoose';

const governmentUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Water, Electricity, Roads
}, { timestamps: true });

export default mongoose.model('GovernmentUser', governmentUserSchema);

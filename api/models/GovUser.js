import mongoose from 'mongoose';

const GovUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String
});

export default mongoose.model('GovUser', GovUserSchema);

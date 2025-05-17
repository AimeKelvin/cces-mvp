import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => await bcrypt.hash(password, 10);
export const matchPassword = async (input, hashed) => await bcrypt.compare(input, hashed);
export const generateToken = (user) => jwt.sign({ id: user._id, category: user.category }, process.env.JWT_SECRET, { expiresIn: '7d' });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import complaintRoutes from './routes/complaint.routes.js';
import govRoutes from './routes/gov.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/complaints', complaintRoutes);
app.use('/api/gov', govRoutes);

// Global error handler
app.use(errorHandler);

export default app;

import express from 'express';
import { registerGov, loginGov, getAssignedComplaints, respondToComplaint } from '../controllers/gov.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerGov);
router.post('/login', loginGov);
router.get('/complaints', protect, getAssignedComplaints);
router.post('/complaints/:id/respond', protect, respondToComplaint);

export default router;

import express from 'express';
import { registerGov, loginGov, getAssignedComplaints, respondToComplaint, getLoggedInUser, getComplaintById } from '../controllers/gov.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerGov);
router.post('/login', loginGov);
router.get('/me', protect, getLoggedInUser);
router.get('/complaints', protect, getAssignedComplaints);
router.get('/complaints/:id', protect, getComplaintById);
router.post('/complaints/:id/respond', protect, respondToComplaint);

export default router;
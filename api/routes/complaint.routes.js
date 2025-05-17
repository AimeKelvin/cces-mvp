import express from 'express';
import { submitComplaint, trackComplaint } from '../controllers/complaint.controller.js';

const router = express.Router();

router.post('/', submitComplaint);
router.get('/track/:ticketId', trackComplaint);


export default router;

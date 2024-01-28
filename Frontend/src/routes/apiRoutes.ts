import express from 'express';
import * as jobController from '../controllers/jobController';
import { authenticateToken } from '../middleware/authenticationMiddleware';

const router = express.Router();

router.post('/send-job', authenticateToken, jobController.sendJob);
router.get('/job-status/:jobId', authenticateToken, jobController.getJobStatus);
router.get('/list-jobs', authenticateToken, jobController.listJobs);

export default router;
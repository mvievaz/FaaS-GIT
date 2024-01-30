import express from 'express';
import {sendJob} from '../controllers/jobController';
import { verifyToken } from '../middleware/authenticationMiddleware';
import { OAuthAuthorize, OAuthCallbackEndpoint } from '../controllers/oauth';

const router = express.Router();

router.post('/job/send-job', verifyToken, sendJob);
// router.get('/job/job-status/:jobId', verifyToken, getJobStatus);
// router.get('/job/result/:jobId', verifyToken, getJobStatus);
// router.get('/job/list-jobs', verifyToken, listJobs);

router.get('/oauth/authorize', OAuthAuthorize)
router.get('/oauth/callback',  OAuthCallbackEndpoint)

export default router;
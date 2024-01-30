import express from 'express';
import {getJobResult, sendJob, getJobStatus, getJobs} from '../controllers/jobController';
import { verifyToken } from '../middleware/authenticationMiddleware';
import { OAuthAuthorize, OAuthCallbackEndpoint } from '../controllers/oauth';

const router = express.Router();

router.post('/job/send-job', verifyToken, sendJob);
router.get('/job/job-status/', verifyToken, getJobStatus);
router.get('/job/result/', verifyToken, getJobResult);
router.get('/job/list-jobs', verifyToken, getJobs);

router.get('/oauth/authorize', OAuthAuthorize)
router.get('/oauth/callback',  OAuthCallbackEndpoint)

export default router;
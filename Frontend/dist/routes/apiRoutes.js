"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController_1 = require("../controllers/jobController");
const authenticationMiddleware_1 = require("../middleware/authenticationMiddleware");
const oauth_1 = require("../controllers/oauth");
const router = express_1.default.Router();
router.post('/job/send-job', authenticationMiddleware_1.verifyToken, jobController_1.sendJob);
// router.get('/job/job-status/:jobId', verifyToken, getJobStatus);
// router.get('/job/result/:jobId', verifyToken, getJobStatus);
// router.get('/job/list-jobs', verifyToken, listJobs);
router.get('/oauth/authorize', oauth_1.OAuthAuthorize);
router.get('/oauth/callback', oauth_1.OAuthCallbackEndpoint);
exports.default = router;

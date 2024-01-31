"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObserverStats = exports.getJobs = exports.getJobResult = exports.getJobStatus = exports.sendJob = void 0;
const jobModel_1 = require("../models/jobModel");
const uuid_1 = require("uuid");
const userModel_Observer_1 = require("../models/userModel&Observer");
function isValidURL(url) {
    const pattern = /^(https?:\/\/)?([\w\d.-]+)\.([a-z]{2,})(:\d{1,5})?(\/\S*)?$/i;
    return pattern.test(url);
}
const sendJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body.URL !== 'string') {
            throw new Error('URL of the git repository not found.Make sure to pass the git url via a field in the body called \'URL\' ');
        }
        const gitURL = req.body.URL;
        if (!isValidURL(gitURL)) {
            throw new Error('URL of the git repository not valid ');
        }
        const email = req.email;
        if (email === undefined) {
            throw new Error('There is no Email');
        }
        const jobID = (0, uuid_1.v4)();
        const job = {
            jobID: jobID,
            status: 'pending',
            userID: email,
            url: gitURL,
            elapsedTime: 0,
            name: req.body.name
        };
        // Add job to JobsQueue and add it to the jobsRelatedToUser
        (0, jobModel_1.addJob)(jobID, job);
        console.log('Job added:', job);
        res.status(200).json({ message: `job added to the queue, with ID = ${jobID}`, data: { gitURL } });
    }
    catch (error) {
        console.error('Error extracting gitURL:', error);
        res.status(400).json({ error: error });
    }
});
exports.sendJob = sendJob;
const getJobStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body.jobID !== 'string') {
            throw new Error('Pass a valid jobID type String');
        }
        const jobIDRequested = req.body.jobID;
        const email = req.email;
        if (email === undefined) {
            throw new Error('There is no Email');
        }
        const jobRequested = (0, jobModel_1.getJob)(jobIDRequested);
        if (jobRequested === undefined) {
            throw new Error('There is no job with this jobID');
        }
        res.send(jobRequested === null || jobRequested === void 0 ? void 0 : jobRequested.status);
    }
    catch (error) {
        console.error('Error getting the job:', error);
        res.status(400).json({ error: error });
    }
});
exports.getJobStatus = getJobStatus;
const getJobResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body.jobID !== 'string') {
            throw new Error('Pass a valid jobID type String');
        }
        const jobIDRequested = req.body.jobID;
        const email = req.email;
        if (email === undefined) {
            throw new Error('There is no Email');
        }
        const jobRequested = (0, jobModel_1.getJob)(jobIDRequested);
        if (jobRequested === undefined) {
            throw new Error('There is no job with this jobID');
        }
        res.send(jobRequested === null || jobRequested === void 0 ? void 0 : jobRequested.result);
    }
    catch (error) {
        console.error('Error getting the job:', error);
        res.status(400).json({ error: error });
    }
});
exports.getJobResult = getJobResult;
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobIDRequested = req.body.jobID;
        const email = req.email;
        if (email === undefined) {
            throw new Error('There is no Email');
        }
        const jobList = (0, jobModel_1.getJobsByUser)(email);
        res.send(jobList);
    }
    catch (error) {
        console.error('Error getting the jobs:', error);
        res.status(400).json({ error: error });
    }
});
exports.getJobs = getJobs;
const getObserverStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobIDRequested = req.body.secret;
        if (jobIDRequested !== "adminSecret1234") {
            throw new Error('Wrong Password');
        }
        res.send(userModel_Observer_1.Observer);
    }
    catch (error) {
        console.error('Error getting the observerStats:', error);
        res.status(400).json({ error: error });
    }
});
exports.getObserverStats = getObserverStats;

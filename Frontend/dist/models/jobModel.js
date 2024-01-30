"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobsByUser = exports.removeJob = exports.getJob = exports.addJob = exports.JobQueue = void 0;
exports.JobQueue = {};
function addJob(jobId, job) {
    exports.JobQueue[jobId] = job;
}
exports.addJob = addJob;
//Retrieving a job from the dictionary
function getJob(jobId) {
    return exports.JobQueue[jobId];
}
exports.getJob = getJob;
//Removing a job from the dictionary
function removeJob(jobId) {
    delete exports.JobQueue[jobId];
}
exports.removeJob = removeJob;
//Get jobs by userID
function getJobsByUser(userID) {
    let jobsList = Object.values(exports.JobQueue);
    return jobsList.filter(job => job.userID === userID);
}
exports.getJobsByUser = getJobsByUser;

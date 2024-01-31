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
exports.getJobsByUser = exports.removeJob = exports.getJob = exports.addJob = exports.JobQueue = void 0;
const nats_1 = require("nats");
exports.JobQueue = {};
function addJob(jobId, job) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.JobQueue[jobId] = job;
        const sc = (0, nats_1.StringCodec)();
        let nc = yield (0, nats_1.connect)({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] });
        nc.publish("WorkQueue", sc.encode(JSON.stringify(job)));
        nc.flush();
        nc.close();
    });
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

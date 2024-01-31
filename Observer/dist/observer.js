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
const nats_1 = require("nats");
var jobsDic = {};
const sc = (0, nats_1.StringCodec)();
function subscribe() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let nc = yield (0, nats_1.connect)({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] });
            const sub = nc.subscribe("WorkerQueue", {
                callback: (err, msg) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        let job = JSON.parse(sc.decode(msg.data));
                        jobsDic[job.jobID] = { 'ArrivalTime': new Date() };
                        console.log(jobsDic);
                    }
                }
            });
            const sub1 = nc.subscribe("FrontQueue", {
                callback: (err, msg) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        let job = JSON.parse(sc.decode(msg.data));
                        if (job.status === 'working')
                            jobsDic[job.jobID].StartTime = new Date();
                        else
                            jobsDic[job.jobID].FinishTime = new Date();
                        console.log(jobsDic);
                    }
                }
            });
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
function checkStatus() {
}
subscribe();
setInterval(() => checkStatus(), 5000);

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
var jobsList = {};
// Total jobs completed
var jobsCompleted = 0;
// Average jobs completed per minute
var averageJobsCompleted = 0;
// Total requests
var requests = 0;
// Average requests per minute
var averageRequests = 0;
// Average time to complete jobs
var averageElapsedTime = 0;
// Minutes since the observer is running
var minutes = 0;
const sc = (0, nats_1.StringCodec)();
// Async function to susbcribe to the queues
function subscribe() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Connection to the cluster
            let nc = yield (0, nats_1.connect)({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] });
            //Subscription to the WorkQueue
            const sub = nc.subscribe("WorkQueue", {
                callback: (err, msg) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        requests++;
                    }
                }
            });
            //Subscription to the ResultQueue
            const sub1 = nc.subscribe("ResultQueue", {
                callback: (err, msg) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        // Parse the message recieved
                        let job = JSON.parse(sc.decode(msg.data));
                        if (job.status !== 'working') {
                            jobsCompleted++;
                            averageElapsedTime = averageElapsedTime + ((job.elapsedTime - averageElapsedTime) / jobsCompleted);
                        }
                    }
                }
            });
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
//Calculate averages and print status
function checkStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        minutes++;
        // Average request per minute calculed as request / minutes
        averageRequests = requests / minutes;
        // Average completed jobs per minute calculed as jobs completed / minutes
        averageJobsCompleted = jobsCompleted / minutes;
        //Conect to the cluster
        let nc = yield (0, nats_1.connect)({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] });
        // Publish averages
        nc.publish("ObserverQueue", sc.encode(JSON.stringify({ 'averageRequests': averageRequests, 'averageCompleted': averageJobsCompleted,
            'averageTime': averageElapsedTime })));
        console.log("Average requests per minute: " + averageRequests);
        console.log("Average jobs completed per minute: " + averageJobsCompleted);
        console.log("Average time to complete jobs: " + averageElapsedTime);
    });
}
subscribe();
setInterval(() => checkStatus(), 60000);

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
const ts_nats_1 = require("ts-nats");
var jobsDic = {};
function submessage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let nc = yield (0, ts_nats_1.connect)({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] });
            let sub = yield nc.subscribe('WorkerQueue', (err, msg) => {
                let job = JSON.parse(msg.data);
                jobsDic[job.id] = { 'ArrivalDate': new Date() };
                console.log(jobsDic);
            });
            let sub2 = yield nc.subscribe('FrontQueue', (err, msg) => {
                let job = JSON.parse(msg.data);
                if (job.status == "Working") {
                    jobsDic[job.id]['InitDate'] = new Date();
                    console.log(jobsDic);
                }
                else {
                    jobsDic[job.id]['FinishDate'] = new Date();
                    console.log(jobsDic);
                }
            });
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
submessage();

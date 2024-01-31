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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const nats_1 = require("nats");
const jobModel_1 = require("./models/jobModel");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Mount routes
app.use('/', apiRoutes_1.default);
const PORT = process.env.PORT || 3000;
//Subscribe to the NATS QUEUE
function subscribe() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sc = (0, nats_1.StringCodec)();
            let nc = yield (0, nats_1.connect)({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] });
            const sub = nc.subscribe("ResultQueue", {
                callback: (err, msg) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        let job = JSON.parse(sc.decode(msg.data));
                        console.log(job);
                        if (job.status === 'working')
                            jobModel_1.JobQueue[job.jobID].status = `working`;
                        else {
                            jobModel_1.JobQueue[job.jobID].status = 'finished';
                            jobModel_1.JobQueue[job.jobID].result = job.result;
                            jobModel_1.JobQueue[job.jobID].elapsedTime = job.elapsedTime;
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
subscribe();
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

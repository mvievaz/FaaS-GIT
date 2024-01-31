"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const python = __importStar(require("./progLang/python"));
const nodeJS = __importStar(require("./progLang/nodeJS"));
const rust = __importStar(require("./progLang/rust"));
const gitFunc = __importStar(require("./gitFunc"));
const nats_1 = require("nats");
const fs = __importStar(require("fs"));
var fdate;
var ldate;
function read(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    }
    catch (error) {
        throw error;
    }
}
function parseJson(filePath) {
    try {
        return JSON.parse(read(filePath));
    }
    catch (error) {
        throw error;
    }
}
function publishError(nc, result, jobID) {
    ldate = new Date();
    var elapsedTime = (ldate.getTime() - fdate.getTime()) / 1000;
    nc.publish("ResultQueue", JSON.stringify({ 'jobID': jobID, 'status': "error", 'result': result, 'elapsedTime': elapsedTime }));
    gitFunc.clearGIT();
}
function publish(nc, result, jobID) {
    ldate = new Date();
    var elapsedTime = (ldate.getTime() - fdate.getTime()) / 1000;
    nc.publish("ResultQueue", JSON.stringify({ 'jobID': jobID, 'status': "finished", 'result': result, 'elapsedTime': elapsedTime }));
    gitFunc.clearGIT();
}
function subscribe() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sc = (0, nats_1.StringCodec)();
            let result;
            let nc = yield (0, nats_1.connect)({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] });
            const sub = nc.subscribe("WorkQueue", {
                queue: "workers",
                callback: (err, msg) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        fdate = new Date();
                        let job = JSON.parse(sc.decode(msg.data));
                        console.log(job);
                        nc.publish("ResultQueue", sc.encode(JSON.stringify({ 'jobID': job.jobID, 'status': 'working' })));
                        gitFunc.downloadGIT(job.url).then(() => {
                            let func = parseJson('./code/faas-manifest.json');
                            console.log(func);
                            switch (func.language) {
                                case "python":
                                    console.log("Python");
                                    python.installDep(func.requirementsFile).then(() => {
                                        console.log("Dep installed");
                                        python.execPython3(func.mainFile, func.arg).then((resolve) => {
                                            result = resolve;
                                            console.log("Python finished:" + result);
                                            let req = read('./code/' + func.requirementsFile);
                                            if (req !== "") {
                                                python.cleanPIP().then(() => {
                                                    publish(nc, result, job.jobID);
                                                }).catch((err) => { publishError(nc, err, job.jobID); });
                                            }
                                            else {
                                                publish(nc, result, job.jobID);
                                            }
                                        }).catch((err) => { publishError(nc, err, job.jobID); });
                                    }).catch((err) => { publishError(nc, err, job.jobID); });
                                    break;
                                case "nodeJS":
                                    console.log("node");
                                    nodeJS.installDep().then(() => {
                                        console.log("Dep installed");
                                        nodeJS.execTS().then((resolve) => {
                                            result = resolve;
                                            publish(nc, result, job.jobID);
                                        }).catch((err) => { publishError(nc, err, job.jobID); });
                                    }).catch((err) => { publishError(nc, err, job.jobID); });
                                    break;
                                case "rust":
                                    console.log("Rust");
                                    rust.execRust(func.arg).then((result) => {
                                        console.log("Rust exected");
                                        publish(nc, result, job.jobID);
                                    }).catch((err) => { publishError(nc, err, job.jobID); });
                                    break;
                                default:
                                    publishError(nc, "No allowed programming language", job.jobID);
                                    break;
                            }
                        }).catch((err) => { publishError(nc, err, job.jobID); });
                    }
                })
            });
        }
        catch (ex) {
            console.log(ex);
        }
    });
}
subscribe();

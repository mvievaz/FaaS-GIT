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
function subscribe() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sc = (0, nats_1.StringCodec)();
            let status = "finished";
            let result;
            let func;
            let nc = yield (0, nats_1.connect)({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] });
            let msec = 3600000;
            const sub = nc.subscribe("WorkQueue", {
                queue: "workers",
                callback: (err, msg) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        let job = JSON.parse(sc.decode(msg.data));
                        console.log(job);
                        nc.publish("ResultQueue", sc.encode(JSON.stringify({ 'jobID': job.jobID, 'status': 'working' })));
                        let timeoutFlag = false;
                        try {
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                timeoutFlag = true;
                                yield gitFunc.downloadGIT(job.URL).then((_resolve) => __awaiter(this, void 0, void 0, function* () {
                                    let file = fs.readFile('./code/faas-manifest.json', 'utf8', (err, data) => {
                                        if (err) {
                                            console.log("Error reading faas maifest");
                                            throw "Error reading faas maifest:   " + err;
                                        }
                                        else {
                                            try {
                                                func = JSON.parse(data);
                                            }
                                            catch (error) {
                                                console.log("Error parsing faas maifest");
                                                throw "Error parsing faas maifest:   " + err;
                                            }
                                        }
                                    });
                                    switch (func.language) {
                                        case "python":
                                            console.log(`Executing Python requirements: ${func.requirementsFile}`);
                                            python.installDep(func.requirementsFile).then(() => {
                                                console.log(`Executing Python mainFile: ${func.mainFile}`);
                                                return python.execPython3(func.mainFile, func.arg);
                                            }).then((res) => {
                                                result = res;
                                                console.log(`Deleting Python requirements`);
                                                python.cleanPIP();
                                            });
                                            break;
                                        case "nodeJS":
                                            console.log(`Executing Node requirements`);
                                            nodeJS.installDep().then(() => {
                                                console.log(`Executing Node`);
                                                return nodeJS.execTS();
                                            }).then((resolve) => {
                                                result = resolve;
                                            });
                                            break;
                                        case "rust":
                                            console.log(`Executing Rust`);
                                            rust.execRust(func.arg).then((resolve) => {
                                                result = resolve;
                                            });
                                            break;
                                        default:
                                            console.log(`Not allowed programming language: ${func.language}`);
                                            throw `Not allowed programming language: ${func.language}`;
                                    }
                                }))
                                    .catch((err) => {
                                    console.log("Error on execution:   " + err);
                                    result = "Error on execution:   " + err;
                                    throw (err);
                                });
                            }), msec);
                            if (!timeoutFlag) {
                                status = 'timeout';
                                result = `Timeout error:   Function timeout: ${msec}sec`;
                            }
                        }
                        catch (err) {
                            status = "error";
                            result = "Error:  " + err;
                        }
                        finally {
                            gitFunc.clearGIT().catch((err) => {
                                console.log("Error clearing git folder: " + err);
                            });
                        }
                        nc.publish("ResultQueue", JSON.stringify({ 'jobID': job.jobID, 'status': status, 'result': result, 'elapsedTime': '5' }));
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

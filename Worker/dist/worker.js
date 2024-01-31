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
function subscribe() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sc = (0, nats_1.StringCodec)();
            let nc = yield (0, nats_1.connect)({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] });
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
                        //Work Todo
                        nc.publish("ResultQueue", JSON.stringify({ 'jobID': job.jobID, 'status': 'finished', 'result': '5', 'elapsedTime': '5' }));
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
// Test 1
// var gitURL: string = "https://github.com/mvievaz/PI-Test-for-FaaS.git"
// var mainFile: string = "pi.py"
// var arg: string = "1"
// var req: string = "requirements.txt"
// girFunc.downloadGIT(gitURL).then(() =>
//     python.installDep(req).then(() =>
//         python.execPython3(mainFile, arg).then((resolve) => {
//             console.log(resolve)
//         }).catch((e) => console.error(e))
//     )
// ).catch((e) => console.log(e))
// setTimeout(() => { girFunc.clearGIT().then((_resolve: string) => { console.log("CLEARED") }) }, 10000)
// Test 2
// var gitURL: string = "https://github.com/mvievaz/Taylor-series-for-FaaS.git"
// var mainFile: string = "pi.py"
// var arg: string = "1"
// girFunc.downloadGIT(gitURL).then(() =>
//     typeScript.installDep().then(() =>
//         typeScript.execTS().then((resolve) => {
//             console.log(resolve)
//         }).catch((e) => console.error(e))
//     )
// ).catch((e) => console.log(e))
// setTimeout(() => { girFunc.clearGIT().then((_resolve: string) => { console.log("CLEARED") }) }, 10000)
// Test 3
// var gitURL: string = "https://github.com/mvievaz/Golden-Ratio-for-FaaS.git"
// var arg: string = "20"
// girFunc.downloadGIT(gitURL).then(() =>
//     rust.execRust(arg).then((resolve) => {
//         console.log(resolve)
//     }).catch((e) => console.error(e))
// ).catch((e) => console.log(e))
// setTimeout(() => { girFunc.clearGIT().then((_resolve: string) => { console.log("CLEARED") }) }, 10000)

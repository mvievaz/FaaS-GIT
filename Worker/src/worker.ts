import * as python from './progLang/python'
import * as nodeJS from './progLang/nodeJS'
import * as rust from './progLang/rust'
import * as gitFunc from './gitFunc'
import { connect, NatsConnection, StringCodec } from "nats"
import * as fs from 'fs';

var fdate: Date
var ldate: Date

function read(filePath: string): string {
    try {
        return fs.readFileSync(filePath, 'utf8')
    } catch (error) {
        throw error
    }
}

function parseJson(filePath: string): any {
    try {
        return JSON.parse(read(filePath))
    } catch (error) {
        throw error
    }
}

function publishError(nc: NatsConnection, result: string, jobID: string) {
    ldate = new Date();
    var elapsedTime = (ldate.getTime() - fdate.getTime()) / 1000
    nc.publish("ResultQueue", JSON.stringify({ 'jobID': jobID, 'status': "error", 'result': result, 'elapsedTime': elapsedTime }))
    gitFunc.clearGIT()
}
function publish(nc: NatsConnection, result: string, jobID: string) {
    ldate = new Date();
    var elapsedTime = (ldate.getTime() - fdate.getTime()) / 1000;
    nc.publish("ResultQueue", JSON.stringify({ 'jobID': jobID, 'status': "finished", 'result': result, 'elapsedTime': elapsedTime }))
    gitFunc.clearGIT()
}


async function subscribe() {
    try {
        const sc = StringCodec();
        let result: string;
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] })
        const sub = nc.subscribe("WorkQueue", {
            queue: "workers",
            callback: async (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    fdate = new Date();
                    let job = JSON.parse(sc.decode(msg.data))
                    console.log(job)
                    nc.publish("ResultQueue", sc.encode(JSON.stringify({ 'jobID': job.jobID, 'status': 'working' })))
                    gitFunc.downloadGIT(job.url).then(() => {
                        let func = parseJson('./code/faas-manifest.json');
                        console.log(func)
                        switch (func.language) {
                            case "python":
                                console.log("Python")
                                python.installDep(func.requirementsFile).then(() => {
                                    console.log("Dep installed")
                                    python.execPython3(func.mainFile, func.arg).then((resolve) => {
                                        result = resolve
                                        console.log("Python finished:" + result)
                                        let req = read('./code/' + func.requirementsFile);
                                        if (req !== "") {
                                            python.cleanPIP().then(() => {
                                                publish(nc, result, job.jobID)
                                            }).catch((err) => { publishError(nc, err, job.jobID) })
                                        }
                                        else {
                                            publish(nc, result, job.jobID)
                                        }
                                    }).catch((err) => { publishError(nc, err, job.jobID) })
                                }).catch((err) => { publishError(nc, err, job.jobID) })
                                break;
                            case "nodeJS":
                                console.log("node")
                                nodeJS.installDep().then(() => {
                                    console.log("Dep installed")
                                    nodeJS.execTS().then((resolve) => {
                                        result = resolve
                                        publish(nc, result, job.jobID)
                                    }).catch((err) => { publishError(nc, err, job.jobID) })
                                }).catch((err) => { publishError(nc, err, job.jobID) })
                                break;
                            case "rust":
                                console.log("Rust")
                                rust.execRust(func.arg).then((result) => {
                                    console.log("Rust exected")
                                    publish(nc, result, job.jobID)
                                }).catch((err) => { publishError(nc, err, job.jobID) })
                                break;
                            default:
                                publishError(nc, "No allowed programming language", job.jobID)
                                break;
                        }
                    }).catch((err) => { publishError(nc, err, job.jobID) })
                }
            }
        })

    } catch (ex) {
        console.log(ex)
    }
}

subscribe()
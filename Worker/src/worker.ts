import * as python from './progLang/python'
import * as nodeJS from './progLang/nodeJS'
import * as rust from './progLang/rust'
import * as gitFunc from './gitFunc'
import { connect, StringCodec } from "nats"
import * as fs from 'fs';

async function subscribe() {
    try {
        const sc = StringCodec();
        let status: string = "finished";
        let result: string;
        let func: any;
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] })
        let sec = 3600

        const sub = nc.subscribe("WorkQueue", {
            queue: "workers",
            callback: (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let job = JSON.parse(sc.decode(msg.data))
                    console.log(job)
                    nc.publish("ResultQueue", sc.encode(JSON.stringify({ 'jobID': job.jobID, 'status': 'working' })))
                    let timeoutFlag = false;

                    try {
                        setTimeout(() => {
                            gitFunc.downloadGIT(job.URL).then(async (_resolve) => {
                                timeoutFlag = true
                                let file = fs.readFile('./code/faas-manifest.json', 'utf8',
                                    (err, data) => {
                                        if (err) {
                                            console.log("Error reading faas maifest");
                                            throw "Error reading faas maifest: \n\n" + err
                                        }
                                        else {
                                            try {
                                                func = JSON.parse(data);
                                            } catch (error) {
                                                console.log("Error parsing faas maifest");
                                                throw "Error parsing faas maifest: \n\n" + err
                                            }

                                        }
                                    }
                                )
                                switch (func.language) {
                                    case "python":
                                        console.log(`Executing Python requirements: ${func.requirementsFile}`)
                                        python.installDep(func.requirementsFile).then(() => {
                                            console.log(`Executing Python mainFile: ${func.mainFile}`)
                                            return python.execPython3(func.mainFile, func.arg)
                                        }
                                        ).then((res: string) => {
                                            result = res;
                                            console.log(`Deleting Python requirements`)
                                            python.cleanPIP()
                                        }
                                        )
                                        break;
                                    case "nodeJS":
                                        console.log(`Executing Node requirements`)
                                        nodeJS.installDep().then(() => {
                                            console.log(`Executing Node`)
                                            return nodeJS.execTS()
                                        }
                                        ).then((resolve: string) => {
                                            result = resolve;
                                        })
                                        break;
                                    case "rust":
                                        console.log(`Executing Rust`)
                                        rust.execRust(func.arg).then((resolve: string) => {
                                            result = resolve;
                                        })
                                        break;
                                    default:
                                        console.log(`Not allowed programming language: ${func.language}`)
                                        throw `Not allowed programming language: ${func.language}`
                                }
                            })
                                .catch((err: any) => {
                                    result = "Error on execution: \n\n" + err;
                                    throw (err)
                                })
                        }
                            , sec * 1000)
                        if (!timeoutFlag) {
                            status = 'timeout'
                            result = `Timeout error: \n\nFunction timeout: ${sec}sec`
                        }
                    }
                    catch (err) {
                        status = "error"
                        result = "Error:\n\n" + err;
                    }
                    finally {
                        gitFunc.clearGIT().catch(
                            (err) => {
                                console.log("Error clearing git folder:\n" + err)
                            }
                        )
                    }
                    nc.publish("ResultQueue", JSON.stringify({ 'jobID': job.jobID, 'status': status, 'result': result, 'elapsedTime': '5' }))
                }
            }
        })

    } catch (ex) {
        console.log(ex)
    }
}

subscribe()
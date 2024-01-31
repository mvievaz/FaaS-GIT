import * as python from './progLang/python'
import * as nodeJS from './progLang/nodeJS'
import * as rust from './progLang/rust'
import * as gitFunc from './gitFunc'
import { connect, StringCodec } from "nats"
import * as fs from 'fs';

async function subscribe(){
    try {

        const sc = StringCodec();
        let status: string = "finished";
        let result: string
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']})
        let sec = 3600
        
        const sub = nc.subscribe("WorkQueue", { 
            queue: "workers",
            callback: (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let job = JSON.parse(sc.decode(msg.data))
                    console.log(job)
                    nc.publish("ResultQueue", sc.encode(JSON.stringify({'jobID': job.jobID , 'status': 'working'})))
                    let timeoutFlag = false;

                    try{
                        setTimeout( () => {
                            gitFunc.downloadGIT(job.URL).then( async (_resolve) => {
                                timeoutFlag = true
                                switch (job.function.language) {
                                    case "python":
                                        console.log(`Executing Python requirements: ${job.function.requirementsFile}`)
                                        python.installDep(job.function.requirementsFile).then(() =>{
                                            console.log(`Executing Python mainFile: ${job.function.mainFile}`)
                                            return python.execPython3(job.function.mainFile, job.function.arg)
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
                                        nodeJS.installDep().then(() =>{
                                            console.log(`Executing Node`)
                                            return nodeJS.execTS()
                                            }
                                        ).then((resolve: string) => {
                                            result = resolve;
                                        })
                                        break;
                                    case "rust":
                                        console.log(`Executing Rust`)
                                        rust.execRust(job.function.arg).then((resolve: string) => {
                                            result = resolve;
                                        })
                                        break;
                                    default:
                                        console.log(`Bad programming language: ${job.function.language}`)
                                        result = `Bad programming language: ${job.function.language}`
                                        break;
                                }
                            })
                            .catch((err: any) => {
                                status = "error"
                                result = "Error on execution: \n\n" + err;
                            })
                        }
                        , sec*1000)
                        if (!timeoutFlag) {
                            status = 'timeout'
                            result = `Timeout error: \n\nFunction timeout: ${sec}sec`
                        }
                    }
                    finally{
                        gitFunc.clearGIT()
                    }
                    nc.publish("ResultQueue", JSON.stringify({'jobID': job.jobID, 'status': status, 'result': result, 'elapsedTime': '5'}))
                }
            }
        })

    } catch(ex) {
        console.log(ex)
    }
}


subscribe()

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
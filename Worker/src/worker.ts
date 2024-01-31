import * as python from './progLang/python'
import * as typeScript from './progLang/nodeJS'
import * as rust from './progLang/rust'
import * as girFunc from './gitFunc'
import { connect, StringCodec } from "nats"

async function subscribe(){
    try {

        const sc = StringCodec();

        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']})
        
        const sub = nc.subscribe("WorkQueue", { 
            queue: "workers",
            callback: (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let job = JSON.parse(sc.decode(msg.data))
                    console.log(job)
                    nc.publish("ResultQueue", sc.encode(JSON.stringify({'jobID': job.jobID , 'status': 'working'})))
                    //Work Todo
                    nc.publish("ResultQueue", JSON.stringify({'jobID': job.jobID, 'status': 'finished', 'result': '5', 'elapsedTime': '5'}))
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
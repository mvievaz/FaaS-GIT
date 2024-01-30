
import { connect, StringCodec } from "nats"

var jobsDic: { [key: string]: any } = {}

const sc = StringCodec();

async function subscribe(){
    try {
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']})
        
        const sub = nc.subscribe("WorkerQueue", {
            callback: (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let job = JSON.parse(sc.decode(msg.data))
                    jobsDic[job.id] = { 'ArrivalTime': new Date() }
                    console.log(jobsDic)
                }
            }
        })

        const sub1 = nc.subscribe("FrontQueue", {
            callback: (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let job = JSON.parse(sc.decode(msg.data))
                    if(job.status === 'working') jobsDic[job.id].StartTime = new Date()
                    else jobsDic[job.id].FinishTime = new Date()
                    console.log(jobsDic)
                }
            }
        })

    } catch(ex) {
        console.log(ex)
    }
}

function checkStatus(){
    
}

subscribe()

setInterval(() => checkStatus(), 5000)
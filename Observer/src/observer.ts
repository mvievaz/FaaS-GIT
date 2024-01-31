
import { connect, StringCodec } from "nats"

var jobsList: { [key: string]: any } = {}

var WaitingToWork = 0
var WaitingToFront = 0


const sc = StringCodec();

// Async function to susbcribe to the queues
async function subscribe(){
    try {
        //Connection to the cluster
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']})
        
        //Subscription to the WorkQueue
        const sub = nc.subscribe("WorkQueue", {
            callback: (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let job = JSON.parse(sc.decode(msg.data))
                    jobsList[job.id] = { 'ArrivalTime': new Date() }
                    console.log(jobsList)
                }
            }
        })

        //Subscription to the ResultQueue
        const sub1 = nc.subscribe("ResultQueue", {
            callback: (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let job = JSON.parse(sc.decode(msg.data))
                    if(job.status === 'working') jobsList[job.id].StartTime = new Date()
                    else jobsList[job.id].FinishTime = new Date()
                    console.log(jobsList)
                }
            }
        })

    } catch(ex) {
        console.log(ex)
    }
}

//Calculate averages and print status
function checkStatus(){
    for (const key in jobsList) {
        if(jobsList.hasOwnProperty(key)) {
          const job = jobsList[key];
          
        }
    }
}

subscribe()

setInterval(() => checkStatus(), 5000)
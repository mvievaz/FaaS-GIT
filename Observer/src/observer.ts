
import { connect, StringCodec } from "nats"

var jobsList: { [key: string]: any } = {}

// Total jobs completed
var jobsCompleted = 0
// Average jobs completed per minute
var averageJobsCompleted = 0
// Total requests
var requests = 0
// Average requests per minute
var averageRequests = 0
// Average time to complete jobs
var averageElapsedTime = 0
// Minutes since the observer is running
var minutes = 0

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
                    requests++
                }
            }
        })

        //Subscription to the ResultQueue
        const sub1 = nc.subscribe("ResultQueue", {
            callback: (err, msg) => {
                if (err) {
                    console.log(err.message)
                } else {
                    // Parse the message recieved
                    let job = JSON.parse(sc.decode(msg.data))
                    if(job.status !== 'working')
                    {
                        jobsCompleted++
                        averageElapsedTime = averageElapsedTime + ((job.elapsedTime - averageElapsedTime) / jobsCompleted)
                    }
                }
            }
        })



    } catch(ex) {
        console.log(ex)
    }
}

//Calculate averages and print status
async function checkStatus(){

    minutes++
    
    // Average request per minute calculed as request / minutes
    averageRequests = requests / minutes

    // Average completed jobs per minute calculed as jobs completed / minutes
    averageJobsCompleted = jobsCompleted / minutes

    //Conect to the cluster
    let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222'] })

    // Publish averages
    nc.publish("ObserverQueue", sc.encode(JSON.stringify({ 'averageRequests': averageRequests, 'averageCompleted': averageJobsCompleted,
        'averageTime': averageElapsedTime })))

    console.log("Average requests per minute: " + averageRequests)
    console.log("Average jobs completed per minute: " + averageJobsCompleted)
    console.log("Average time to complete jobs: " + averageElapsedTime)
}

subscribe()

setInterval(() => checkStatus(), 60000)
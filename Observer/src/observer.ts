import {connect, NatsConnectionOptions, Payload} from 'ts-nats';

var jobsDic = {}

async function submessage(){
    try {
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']});
    
        let sub = await nc.subscribe('WorkerQueue', (err, msg) => {
            let job = JSON.parse(msg.data)
            jobsDic[job.id] = { 'ArrivalDate': new Date() }
            console.log(jobsDic)
        });

        let sub2 = await nc.subscribe('FrontQueue', (err, msg) => {
            let job = JSON.parse(msg.data)
            if(job.status == "Working"){
                jobsDic[job.id]['InitDate'] = new Date()
                console.log(jobsDic)
            }else{
                jobsDic[job.id]['FinishDate'] = new Date()
                console.log(jobsDic)
            }
        });
    } catch(ex) {
        console.log(ex)
    }
}

submessage()
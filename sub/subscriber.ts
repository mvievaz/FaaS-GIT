import {connect, NatsConnectionOptions, Payload} from 'ts-nats';

async function submessage(){
    try {
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']});
    
        let sub = await nc.subscribe('WorkerQueue', (err, msg) => {
            const job = JSON.parse(msg.data)
            console.log(job)
            nc.publish("FrontQueue", JSON.stringify({'jobID': job.jobID , 'status': 'working'}))
            console.log('Message received on', msg.subject, ":", msg.data);
            let suma = 0
            for (let i = 0; i < 25; i++) {
                suma += Math.random() * 100;
            }
            nc.publish("FrontQueue", JSON.stringify({'jobID': job.jobID, 'status': 'finished', 'result': suma}))
        }, {queue: 'Workers'});
    } catch(ex) {
        console.log(ex)
    }
}

submessage()
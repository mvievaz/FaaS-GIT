import {connect, NatsConnectionOptions, Payload} from 'ts-nats';

async function submessage(){
    try {
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']});
    
        let sub = await nc.subscribe('WorkerQueue', (err, msg) => {
            nc.publish("FrontQueue", "I'm on it!")
            console.log('Message received on', msg.subject, ":", msg.data);
            let suma = 0
            for (let i = 0; i < 25; i++) {
                suma += Math.random() * 100;
            }
            nc.publish("FrontQueue", "Job done! Result: " + suma)
        }, {queue: 'Workers'});
    } catch(ex) {
        console.log(ex)
    }
}

submessage()
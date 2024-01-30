import {connect, NatsConnectionOptions, Payload} from 'ts-nats';

async function submessage(){
    try {
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']});
    
        let sub = await nc.subscribe('WorkerQueue', (err, msg) => {
            //console.log('Message received on', msg.subject, ":", msg.data);
        });

        let sub2 = await nc.subscribe('FrontQueue', (err, msg) => {
            //console.log('Message received on', msg.subject, ":", msg.data);
        });
    } catch(ex) {
        console.log(ex)
    }
}

submessage()
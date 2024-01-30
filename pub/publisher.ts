import {connect, NatsConnectionOptions, Payload} from 'ts-nats';

async function pubmessage(){
    try {
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']});
    
        nc.publish("WorkerQueue", "Do something!");
        await nc.flush();
        await nc.close();
    } catch(ex) {
        console.log(ex)
    }
}

async function submessage(){
    try {
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']});
    
        let sub = await nc.subscribe('FrontQueue', (err, msg) => {
            console.log('Message received on', msg.subject, ":", msg.data);
            //WorkToDo
        });
    } catch(ex) {
        console.log(ex)
    }
}

submessage()
pubmessage()
pubmessage()
pubmessage()
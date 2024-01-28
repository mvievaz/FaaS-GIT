import {connect, NatsConnectionOptions, Payload} from 'ts-nats';


async function submessage(){
    try {
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']});
    
        let sub = await nc.subscribe('Work', (err, msg) => {
            console.log('message received on', msg.subject, ":", msg.data);
            //WorkToDo
        }, {queue: 'Workers'});
    } catch(ex) {
        console.log(ex)
    }
}

submessage()
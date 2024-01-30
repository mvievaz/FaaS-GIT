import {connect, NatsConnectionOptions, Payload} from 'ts-nats';

async function pubmessage(id: string){
    try {
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']});
    
        nc.publish("WorkerQueue", JSON.stringify({'id': id}));
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
            let job = JSON.parse(msg.data)
            if(job.status === 'finished') console.log('Message received on', msg.subject, ":", job.result);
        });
    } catch(ex) {
        console.log(ex)
    }
}

submessage()
pubmessage("1")
pubmessage("2")
pubmessage("3")
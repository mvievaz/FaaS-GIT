import {connect, NatsConnectionOptions, Payload} from 'ts-nats';

async function pubmessage(){
    try {
        let nc = await connect({ servers: ['nats://nats:4222', 'nats://nats-1:4222', 'nats://nats-2:4222']});
    
        nc.publish('Work', 'Do something!');
        console.log("Publicado")

        await nc.flush();
        await nc.close();
    } catch(ex) {
        console.log(ex)
    }
}

pubmessage()
pubmessage()
pubmessage()
pubmessage()
pubmessage()
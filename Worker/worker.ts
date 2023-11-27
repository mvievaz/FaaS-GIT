import { connect } from "ts-nats";

async function subscribeToMessages() {
    // Connect to the NATS server
    const nc = await connect({ servers: ["demo.nats.io:4222"] });
  
    // Your subject
    const subject = 'work';
  
    // Subscribe to the subject
    nc.subscribe(subject, (err, msg) => {
      console.log(msg)
    }, { queue: 'workers' });
  
    // Close the connection
    await nc.close();
}

while(true){
  // Run the subscriber
  subscribeToMessages().catch((err) => {
    console.error(`Error: ${err.message}`);
  });
}

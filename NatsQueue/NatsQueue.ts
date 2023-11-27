import { connect } from "ts-nats";

async function publishMessage() {
  // Connect to the NATS server
  const nc = await connect({ servers: ["demo.nats.io:4222"] });

  // Your subject and message
  const subject = "work";
  const message = "Hello, NATS!";

  // Publish the message
  await nc.publish(subject, message);

  // Close the connection
  await nc.close();
}

while(true){
  // Run the publisher
  publishMessage().catch((err) => {
    console.error("Error: " + err.message);
  });
}


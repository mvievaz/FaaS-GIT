FROM node:latest

WORKDIR /usr/src/app

RUN npm install ts-nats typescript @types/node

COPY NatsQueue.ts .

RUN npx tsc NatsQueue.ts

# Command to run the application
CMD ["node", "NatsQueue.js"]
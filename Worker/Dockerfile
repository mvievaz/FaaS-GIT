FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install ts-nats typescript @types/node

COPY worker.ts .

RUN npx tsc worker.ts

CMD ["node", "worker.js"]
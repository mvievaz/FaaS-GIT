FROM node:latest
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY worker.ts .

RUN npx tsc worker.ts

CMD ["node", "worker.js"]

FROM node:latest
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY /dist/worker.js .

CMD ["node", "worker.js"]

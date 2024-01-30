FROM node:latest
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#Instalar docker y iniciar la API incompleto
RUN apt-get update
RUN apt install docker.io -y
RUN sed -i '/^ExecStart=/s/$/ -H=tcp:\/\/0.0.0.0:2375/' /lib/systemd/system/docker.service

COPY worker.ts .

RUN npx tsc worker.ts

CMD ["node", "worker.js"]

FROM node:latest
WORKDIR /usr/src/app
RUN npm install ts-nats
RUN npm install -g ts-node typescript
COPY ./subscriber.ts .
CMD ["ts-node", "subscriber.ts"]
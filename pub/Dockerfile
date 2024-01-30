FROM node:latest
WORKDIR /usr/src/app
RUN npm install ts-nats
RUN npm install -g ts-node typescript
COPY ./publisher.ts .
CMD ["ts-node", "publisher.ts"]
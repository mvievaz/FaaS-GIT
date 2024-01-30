FROM node:latest
WORKDIR /usr/src/app
RUN npm install ts-nats
RUN npm install -g ts-node typescript
COPY ./observer.ts .
CMD ["ts-node", "observer.ts"]
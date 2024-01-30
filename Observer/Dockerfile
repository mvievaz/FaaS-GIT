FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./dist/observer.js .
RUN npm install
CMD ["node", "observer.js"]
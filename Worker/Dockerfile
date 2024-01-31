FROM ubuntu:latest

WORKDIR /usr/src/app

COPY package*.json ./

# Install Node
RUN apt-get update && apt-get install -y nodejs npm

# Install Python
RUN apt-get install -y python3 python3-pip

# Install Rust
RUN apt-get install -y curl && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && . $HOME/.cargo/env

COPY . .

RUN npm install

CMD ["npm", "start"]
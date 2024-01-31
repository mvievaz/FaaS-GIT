FROM ubuntu:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl build-essential python3 python3-pip

# Install Node
RUN apt-get install -y ca-certificates gnupg
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
ENV NODE_MAJOR=20
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install nodejs -y

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install

CMD ["npm", "start"]
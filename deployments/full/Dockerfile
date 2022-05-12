# ---- DEPENDENCIES -----
FROM node:16.14.2-alpine3.14 AS dependencies

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

## Install Python
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

# Setup node_modules
COPY package.json package-lock.json ./ 

# Install dependencies to install play-dl
RUN npm install opusscript
RUN npm install node-opus

# Install rest of dependencies
RUN npm install

# -------- BASE --------
FROM node:16.14.2-alpine3.14 AS base

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy node_modules
COPY --from=dependencies /usr/src/bot .

# Copy rest of the source code
COPY . .

# Start the bot.
CMD ["VERSION=FULL", "npm", "run", "dev"]
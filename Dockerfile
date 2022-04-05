# -------- BASE --------
FROM node:16.14.2-alpine3.14 AS base

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Install ffmpeg dependencies
RUN apk update
RUN apk add
RUN apk add ffmpeg

# -------- BUILD --------
FROM node:16.14.2-alpine3.14 AS build

## Install Python
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

# Setup node_modules
COPY package.json .
RUN npm install

# Copy rest of source code
COPY . .

# -------- DEPLOYMENT --------
FROM base AS deployment

COPY --from=build . /usr/src/bot

# Start the bot.
CMD ["npm", "run", "dev"]
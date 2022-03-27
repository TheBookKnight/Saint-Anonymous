FROM node:16.14.2-alpine3.14

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Setup node_modules
COPY package.json /usr/src/bot
RUN npm install

# Copy rest of source code
COPY . /usr/src/bot

# Deploy commands
RUN npm run setup

# Install ffmpeg dependencies
RUN apk update
RUN apk add
RUN apk add ffmpeg

# Start the bot.
CMD ["npm", "start"]
# ---- DEPENDENCIES -----
FROM node:16.14.2-alpine3.14 AS dependencies

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Setup node_modules
COPY package.json package-lock.json ./ 

# Uninstall music player dependencies
RUN npm uninstall @discordjs/opus @discordjs/voice ffmpeg-static libsodium-wrappers play-dl

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
CMD ["npm", "run", "dev"]
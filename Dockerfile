# ---- DEPENDENCIES -----
FROM node:16.14.2-alpine3.14 AS dependencies

## Install Python
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

# Setup node_modules
COPY package.json package-lock.json ./ 

# Install dependencies to install play-dl
RUN npm install opusscript
RUN npm install node-opus

# Install rest of dependencies
RUN npm install 

# Remove play-dl's dependency's node_modules
RUN npm prune opusscript
RUN npm prune node-opus

# -------- BASE --------
FROM node:16.14.2-alpine3.14 AS base

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy node_modules
COPY --from=dependencies node_modules .

# Copy rest of the source code
COPY . .

# Start the bot.
CMD ["npm", "run", "dev"]
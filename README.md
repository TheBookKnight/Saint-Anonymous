# Saint-Anonymous

A Discord bot to create Anonymous Prayer Requests and more

## Prerequisites

1. Download latest [NodeJS](https://nodejs.org/en/) (here was v16.14.x)
2. Setup a [Discord Developer account](https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications)

## Setup Instructions

1. Download this repo
2. Add a 'config.json' to the root directory. It should have the format below

See this repo's Wiki - [Chapter 0](https://github.com/JoshuaTheEngineer/joshua-creates-a-discord-bot/wiki/How-to-Create-a-Discord-Bot#ch-0-initialize-discord-app) and [Chapter 2](https://github.com/JoshuaTheEngineer/joshua-creates-a-discord-bot/wiki/How-to-Create-a-Discord-Bot#ch-2-setup-your-discord-bot-app-for-the-server) for values.

```
{
	"clientId":	"${CLIENT_ID}",
	"guildId":	"${GUILD_ID}",
	"token":	"${TOKEN}"
}
```

3. Run `npm install` to install dependencies
4. Run `node deploy-commands.js` to setup commands
5. Create a Discord invite link via [this repo's Wiki - Chapter 2](https://github.com/JoshuaTheEngineer/joshua-creates-a-discord-bot/wiki/How-to-Create-a-Discord-Bot#ch-2-setup-your-discord-bot-app-for-the-server).
6. Run `node .` to start the Bot.

## How to Use Saint Anonymous

1. Directly message Saint Anonymous your prayer. It will share it anonymously to the first channel it finds with #prayer-requests in its name. Only works if it has one.

<img width="450" alt="image" src="https://user-images.githubusercontent.com/13317525/168947090-5a8f635c-cde5-4983-986c-efbeef7795aa.png">

2. Slash command `/praise {enter praise}` in the channel. It will enter the praise with a GIF.

<img width="403" alt="image" src="https://user-images.githubusercontent.com/13317525/168947395-91975fc0-ca0b-4818-a2aa-aa5cda84217f.png">

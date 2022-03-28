const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILDS, 
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES
	],
	partials: [
        'CHANNEL', // Required to receive DMs
    ]
});

const eventFiles = fs.readdirSync('./events')
	.filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		let guild = JSON.parse(fs.readFileSync('config.json'));
		client.on(event.name, async (...args) => await event.execute(client, guild['guildId'], ...args));
	}
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.login(token);
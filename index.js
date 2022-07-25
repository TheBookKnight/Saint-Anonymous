const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const cron = require('cron').CronJob;
const { MessageEmbed } = require('discord.js')

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

let guild;

const eventFiles = fs.readdirSync('./events')
	.filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		guild = JSON.parse(fs.readFileSync('config.json'));
		client.on(event.name, async (...args) => await event.execute(client, guild['guildId'], ...args));
	}
}

client.commands = new Collection();
let commandFiles = fs.readdirSync('./commands/active')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/active/${file}`);
	client.commands.set(command.data.name, command);
}

// Adds music commands if full version is loaded
if(process.env.VERSION == 'FULL') {
	console.log("Loading Music Commands...")
	commandFiles = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/music/${file}`);
		client.commands.set(command.data.name, command);
	}
}

client.login(token);

// Reminds to share prayers on Sunday, 3 pm EST  
const reminder = new cron('0 19 * * 0', async function() {
	let targetGuild = await client.guilds.fetch(guild['guildId']);
	if (targetGuild) {
		let banterChannel = await targetGuild.channels.fetch()
			.then(channels => {
				const targetChannel = channels.find(channel => 
					{
						return channel.name.toLowerCase().includes("banter") && channel.type == 'GUILD_TEXT';
					})
				return targetChannel;
			})

		const reminderEmbed = new MessageEmbed()
			.setTitle('Hello There!')
			.setDescription('Share your prayer requests or praises to me for rosary tomorrow. \n\nOr play your music in the #music channel (keep it Christian 🧐) \n\nGod bless ya!')
			.setColor('#add8e6')
			.setImage('https://media.giphy.com/media/yNF0XKi2ZLuow/giphy.gif')
			.addFields(
				{
					name: "Share your Prayer Request Anonymously", 
					value: "**DM** it to me. I'll share it to the #prayers channel"
				},
				{
					name: "Share your Praises Anonymously", 
					value: "In the banter channel. type `/praise {your praise}`"
				},
				{
					name: "Assign Rosary roles", 
					value: "Have all members in the Rosary voice channel. In the banter channel. type `/rosary`"
				},
				{
					name: "Play your YouTube Music Anonymously", 
					value: "In the banter channel, type `/sing {youtube url}`.\nI'll play it on the #music voice channel.\nTo stop it, run `/hush`"
				}
			);
		await banterChannel.send({ embeds: [reminderEmbed]})
	}
})

reminder.start();
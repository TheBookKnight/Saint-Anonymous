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
	commandFiles = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/music/${file}`);
		client.commands.set(command.data.name, command);
	}
}

client.login(token);

// Reminds to share prayers on Monday, 7 am EST  
const mondayReminder = new cron('0 11 * * 1', async function() {
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
			.setTitle('Good Morning!')
			.setDescription('My name is Saint Anonymous. \n\nI share both your prayers and concerns anonymously. \n\nPlease share your prayer requests for rosary tonight. If something or someone concerns you, share it as a concern and the CORE group will look into it. \n\nGod bless you and take care!')
			.setColor('#add8e6')
			.addFields(
				{
					name: "Share your Prayers Anonymously", 
					value: "DM Saint Anonymous your prayer request."
				},
				{
					name: "Share your Concerns Anonymously", 
					value: "In the banter channel, type `/concern` followed by your concern. The CORE Group will read it."
				}
			);
		await banterChannel.send({ embeds: [reminderEmbed]})
	}
})

mondayReminder.start();
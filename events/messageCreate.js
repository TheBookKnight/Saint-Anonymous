module.exports = {
	name: 'messageCreate',
	async execute(client, guildId, message) {
        let targetGuild = await client.guilds.fetch(guildId);
        let prayerChannel = await targetGuild.channels.fetch()
            .then(channels => {
                const targetChannel = channels.find(channel => channel.name.toLowerCase() === "prayer-requests")
                return targetChannel;
            })

        if (message.channel.type === "DM" && message.author.id !== client.user.id) {
            if (prayerChannel) {
                prayerChannel.send(`Prayer Request:\n${message.content}\n\nRequester wishes to remain anonymous`);
                return message.reply('Saint Anonymous shared your prayer.');
            } else {
                return message.reply('Saint Anonymous cannot find the #prayer-channel. Please create one before sending another');
            }
        }
	},
};

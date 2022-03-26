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
            let prayer = message.content.trim();
            
            if (prayerChannel) {
                if (prayer.substr(0,6).toLowerCase() === 'public') {
                    prayer = prayer.substr(6).trim()
                    prayerChannel.send(`**Prayer Request by <@!${message.author.id}>** 🙏\n\n${prayer}`);
                } else {
                    prayerChannel.send(`**Prayer Request** 🙏\n\n${prayer}`);
                }
                return message.reply('Saint Anonymous shared your prayer 🙏');
            } else {
                return message.reply('Saint Anonymous cannot find the #prayer-channel\nPlease create one before trying again.');
            }
        }
	},
};

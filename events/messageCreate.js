const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'messageCreate',
	async execute(client, guildId, message) {
        let targetGuild = await client.guilds.fetch(guildId);
        let prayerChannel = await targetGuild.channels.fetch()
            .then(channels => {
                const targetChannel = channels.find(channel => 
                    {
                        return channel.name.toLowerCase().includes("prayer-requests") && channel.type == 'GUILD_TEXT';
                    })
                return targetChannel;
            })

        if (message.channel.type === "DM" && message.author.id !== client.user.id) {
            let prayer = message.content.trim();
            
            if (prayerChannel) {
                const prayerEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Prayer Request 🙏');
                const publicStatus = prayer.substr(0,6).toLowerCase() === 'public';
                if (publicStatus) {
                    prayer = prayer.substr(6);
                    prayerEmbed
                        .setAuthor({ name: `By ${message.author.username}`, iconURL: message.author.avatarURL()})
                        .setDescription(`${prayer}\nBy <@!${message.author.id}>`)
                } else {
                    prayerEmbed
                        .setAuthor({ name: 'Anonymous', iconURL: 'https://i.imgur.com/AfFp7pu.png'})
                        .setDescription(prayer)
                }
                prayerChannel.send({ embeds: [prayerEmbed] });
                return message.reply('Saint Anonymous shared your prayer 🙏');
            } else {
                return message.reply('Saint Anonymous cannot find the #prayer-channel\nPlease create one before trying again.');
            }
        }
	},
};

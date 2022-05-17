const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'messageCreate',
	async execute(client, guildId, message) {
        let targetGuild = await client.guilds.fetch(guildId);
        let prayerChannel = await targetGuild.channels.fetch()
            .then(channels => {
                const targetChannel = channels.find(channel => 
                    {
                        return channel.name.toLowerCase().includes("prayers") && channel.type == 'GUILD_TEXT';
                    })
                return targetChannel;
            })

        if (message.channel.type === "DM" && message.author.id !== client.user.id) {
            let prayer = message.content.trim();
            
            if (prayerChannel) {
                const prayerEmbed = new MessageEmbed()
                    .setColor('#0099ff');
                const publicStatus = prayer.substr(0,6).toLowerCase() === 'public';
                if (publicStatus) {
                    prayer = prayer.substr(6);
                    prayerEmbed
                        .setTitle('Prayer Request 🙏')
                        .setAuthor({ 
                            name: `By ${message.author.username}`, 
                            iconURL: message.author.avatarURL() || 'https://i.imgur.com/AfFp7pu.png'
                        })
                        .setDescription(`${prayer}\nBy <@!${message.author.id}>`)
                } else {
                    prayerEmbed.setDescription(prayer)
                }
                prayerChannel.send({ embeds: [prayerEmbed] });
                return message.reply('Saint Anonymous shared your prayer 🙏');
            } else {
                return message.reply('Saint Anonymous cannot find the #prayers\nPlease create one before trying again.');
            }
        }
	},
};

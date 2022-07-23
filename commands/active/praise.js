const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

const { gifs } = require('../../resources/gifs.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('praise')
        .setDescription('Shares your praise anonymously.')
        .addStringOption(option => option
            .setName('praise')
            .setDescription("What do you want to praise?")
            .setRequired(true)),
        async execute(interaction) {
            let prayerChannel = await interaction.guild.channels.fetch()
                .then(channels => {
                    const targetChannel = channels.find(channel => 
                        {
                            return channel.name.toLowerCase().includes("prayers") && channel.type == 'GUILD_TEXT';
                        })
                    return targetChannel;
                });
            if (prayerChannel) {
                try {
                    // Sets up the praise
                    const praiseEmbed = new MessageEmbed()
                        .setColor('#879CEB')
                        .setTitle('PRAISE 🙌')
                        .setDescription(interaction.options.getString('praise'))
                        .setImage(gifs[new Date().getMilliseconds() % gifs.length])

                    prayerChannel.send({ embeds: [praiseEmbed] });
                    return interaction.reply({content: 'Saint Anonymous shared your praise 🙌', ephemeral: true});                    
                } catch (error) {
                    console.log("Error with praise slash command...")
                    console.log(error)
                    return interaction.reply({content: 'Saint Anonymous faced an error with praise command', ephemeral: true});                    
                }
            } else {
                return interaction.reply({content: 'Saint Anonymous cannot find the prayers channel', ephemeral: true});
            }
        }
}
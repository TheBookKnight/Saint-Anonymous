const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('concern')
        .setDescription('Shares your concerns anonymously to the CORE group.')
        .addStringOption(option => option
            .setName('concern')
            .setDescription("What are you concerned about?")
            .setRequired(true)),
        async execute(interaction) {
            try {
                let coreChannel = await interaction.guild.channels.fetch()
                    .then(channels => {
                        console.log(channels)
                        const targetChannel = channels.find(channel => 
                            {
                                return channel.name.toLowerCase().includes("core group") && channel.type == 'GUILD_TEXT';
                            })
                        return targetChannel;
                    })
                if (coreChannel) {
                    const concernEmbed = new MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('ANON CONCERN❗')
                        .setDescription(interaction.options.getString('concern'))
                    coreChannel.send({ embeds: [concernEmbed]})
                    return interaction.reply({ content: 'Saint Anonymous shared your concern.', ephemeral: true})
                } else {
                    return interaction.reply({ content: 'Saint Anonymous needs a "Core Group" channel to share concerns.', ephemeral: true})
                }
            } catch(error) {
                console.log(error);
                return interaction.reply({ content: 'Saint Anonymous is currently facing problems... contact your CORE leader', ephemeral: true})
            }
        }
}
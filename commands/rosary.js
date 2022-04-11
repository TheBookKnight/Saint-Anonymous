const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rosary')
        .setDescription('Assign Rosary roles'),
        async execute(interaction) {
            let rosaryChannel = await interaction.guild.channels.fetch()
                .then(channels => {
                    const targetChannel = channels.find(channel => {
                        return channel.name.toLowerCase().includes("rosary") && channel.type == 'GUILD_VOICE'
                    })
                    return targetChannel;
                })
                
            if (typeof rosaryChannel === 'undefined') {
                return await interaction.reply({content: "There's no #rosary Voice channel. Please create one before trying again.", ephemeral: true});
            }

            let members = rosaryChannel.members;
            if(members.length === 0) {
                return await interaction.reply({content: "There's no one on the #rosary Voice channel.", ephemeral: true});
            }

            members = Array.from(members, ([id, info]) => ({id}));
            
            // randomizes choice
            let choose = Math.floor(Math.random() * members.length);

            // prepares who reads the decades and mysteries
            let decades = ['1st Decade:\t', '2nd Decade:\t', '3rd Decade:\t', '4th Decade:\t', '5th Decade:\t']
            for(let decade=0; decade<decades.length; decade++) {
                decades[decade] = decades[decade] + `<@!${members[choose].id}>`;
                choose = (choose + 1) % members.length;
            }
            choose = (choose + 1) % members.length;
            decades.unshift(`Read Mysteries:\t<@!${members[choose].id}>`)
            decades = decades.join('\n');

            // Prepares and sends rosary
            const rosaryEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('VIRTUAL ROSARY 🙏')
                .setAuthor({ name: `By ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
                .setDescription(decades)
            interaction.channel.send({ embeds: [rosaryEmbed] });

            return interaction.reply({content: 'Saint Anonymous organized the rosary 🙏', ephemeral: true});
        }
}
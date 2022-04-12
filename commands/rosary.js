const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rosary')
        .setDescription('Assign Rosary roles')
        .addMentionableOption(reader => reader
                .setName('mystery-reader')
                .setDescription('Who should read the mysteries?'))
        .addMentionableOption(reader => reader
            .setName('opening-closing-prayer')
            .setDescription('Who should say the opening and closing prayers?')),
        async execute(interaction) {
            // Searches for the Rosary Voice Channel
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

            // Collects all members from the Rosary Voice Channel
            let members = rosaryChannel.members;
            if(members.length === 0) {
                return await interaction.reply({content: "There's no one on the #rosary Voice channel.", ephemeral: true});
            }
            members = Array.from(members, ([id, info]) => ({id}));
            
            // Sets up randomizer choice
            let choose = Math.floor(Math.random() * members.length);

            // Sets up rosary
            const rosaryEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('VIRTUAL ROSARY 📿')
                .setURL('https://www.usccb.org/how-to-pray-the-rosary')
                .setAuthor({ name: `By ${interaction.user.username}`, iconURL: interaction.user.avatarURL()})
                .setThumbnail('https://i.imgur.com/pozBOD9.png')

            // Assigns opening prayer
            const openingClosingPrayer = interaction.options.getMentionable('opening-closing-prayer')
            if(openingClosingPrayer) {
                rosaryEmbed.addField('Opening Prayer', `${openingClosingPrayer}`);
            } else {
                rosaryEmbed.addField('Opening Prayer', `<@!${members[choose].id}>`);
            }

            // Sets up mystery reader
            const mysteryReader = interaction.options.getMentionable('mystery-reader')
            if(mysteryReader) {
                rosaryEmbed.addField('Mystery Reader', `${mysteryReader}`);
            } else {
                choose = (choose + 1) % members.length;
                rosaryEmbed.addField('Mystery Reader', `<@!${members[choose].id}>`);
            }

            // Sets up who reads the decades
            let decades = [
                '1st:\t', 
                '2nd:\t', 
                '3rd:\t', 
                '4th:\t', 
                '5th:\t'
            ];
            for(let decade=0; decade<decades.length; decade++) {
                choose = (choose + 1) % members.length;
                decades[decade] = decades[decade] + `<@!${members[choose].id}>`;
            }
            rosaryEmbed.addField('Reading Decades', decades = decades.join('\n'))

            // Sets up Closing Prayer
            choose = (choose + 1) % members.length;
            rosaryEmbed.addField('Closing Prayer', `<@!${members[choose].id}>`)

            // Adds helpful Rosary references
            rosaryEmbed
                .addField('The Rosary', '[How to Pray](https://www.usccb.org/how-to-pray-the-rosary)', true)
                .addField('Hail Mary', '[How to Pray](https://www.usccb.org/prayers/hail-mary)', true)
                .addField('Joyful Mysteries', '[Monday & Saturday](https://www.usccb.org/how-to-pray-the-rosary#joyful-mysteries)', true)
                .addField('Sorrowful Mysteries', '[Tuesday & Friday](https://www.usccb.org/how-to-pray-the-rosary#sorrowful-mysteries)', true)
                .addField('Glorious Mysteries', '[Wednesday](https://www.usccb.org/how-to-pray-the-rosary#glorious-mysteries)', true)
                .addField('Luminous Mysteries', '[Thursday](https://www.usccb.org/how-to-pray-the-rosary#luminous-mysteries)', true)

            // sends the Rosary embed
            interaction.channel.send({ embeds: [rosaryEmbed] });
            return interaction.reply({content: 'Saint Anonymous organized the rosary 📿', ephemeral: true});
        }
}
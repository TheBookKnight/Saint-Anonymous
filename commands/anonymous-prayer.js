const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anonymous-prayer')
        .setDescription('I will share your prayer whether anonymously or not.')
        .addStringOption(option => option
            .setName('prayer')
            .setDescription(`What's your prayer, young child?`)
            .setRequired(true))
        .addStringOption(option => option
            .setName('anonymity')
            .setDescription('Would you like to be anonymous?')
            .setRequired(true)
            .addChoice('Yes', 'Anonymous')
            .addChoice('No', 'Public')),
        async execute(interaction) {
            const prayer = interaction.options.getString('prayer');
            let requester = interaction.options.getString('anonymity');
            requester = `\nRequester is: ${requester === 'Anonymous' ? requester : interaction.user.tag}`
            if (requester === 'Anonymous') {
                await interaction.reply({ content: 'You sent a prayer!', ephemeral: true});
                await interaction.followUp(`Please pray: ${prayer}.${requester}`);
            } else {
                await interaction.reply(`Please pray: ${prayer}.${requester}`);
            }
        }
}
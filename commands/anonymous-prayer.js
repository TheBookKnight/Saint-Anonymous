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
            .setName('requester')
            .setDescription('You can include your name. If not, no worries.')),
        async execute(interaction) {
            const prayer = interaction.options.getString('prayer');
            let requester = interaction.options.getString('requester');
            requester = `\nRequester is: ${requester ? requester : 'Anonymous'}`
            await interaction.reply({ content: 'You sent a prayer!', ephemeral: true});
            await interaction.followUp(`Please pray: ${prayer}.${requester}`);
        }
}
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anon-prayer')
        .setDescription('Shares your prayer anonymously.')
        .addStringOption(option => option
            .setName('prayer')
            .setDescription("What prayer do you want to share anonymously?")
            .setRequired(true)),
        async execute(interaction) {
            const prayer = `Please pray for below:\n${interaction.options.getString('prayer')}\n\nRequester is: Anonymous`;
            await interaction.reply({ content: 'You sent a prayer!', ephemeral: true});
            await interaction.followUp(prayer);
        }
}
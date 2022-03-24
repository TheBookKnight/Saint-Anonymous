const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('public-prayer')
        .setDescription('Shares your prayer publicly.')
        .addStringOption(option => option
            .setName('prayer')
            .setDescription('What would you like to have prayers for?')
            .setRequired(true)),
        async execute(interaction) {
            const prayer = `Please pray for below:\n${interaction.options.getString('prayer')}\n\nRequester is: ${interaction.user.tag}`;
            await interaction.reply(prayer);
        }
}
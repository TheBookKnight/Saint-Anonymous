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
            const prayer = `Prayer Request by <@!${interaction.user.id}> 🙏\n${interaction.options.getString('prayer')}`;
            await interaction.reply(prayer);
        }
}
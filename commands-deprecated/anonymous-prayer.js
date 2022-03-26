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
            const prayer = `Prayer Request 🙏\n${interaction.options.getString('prayer')}`;
            await interaction.reply({ content: 'Saint Anonymous shared your prayer 🙏', ephemeral: true});
            await interaction.followUp(prayer);
        }
}
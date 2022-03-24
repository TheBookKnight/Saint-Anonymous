const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about-me')
        .setDescription('About this bot...'),
        async execute(interaction) {
            await interaction.reply('This bot was created by Joshua Cadavez. It relies on the DiscordJS library.');
        }
}
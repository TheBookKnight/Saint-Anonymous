const { SlashCommandBuilder } = require('@discordjs/builders');
const message = 'Hello, I am Saint Anonymous.\n\nMy calling is to share your prayers and praises anonymously. Joshua Cadavez is my creator. If you have any suggestions to how may I best serve you, reach out to the Core team.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about-me')
        .setDescription('About the Saint Anonymous bot'),
    async execute(interaction) {
        await interaction.reply({ content: message, ephemeral: true });
    }
}
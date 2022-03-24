const { SlashCommandBuilder } = require('@discordjs/builders');
const message = 'Hello, my name is Saint Anonymous.\nI am ordained by Joshua Cadavez to share your prayers anonymously.\nPlease pray 10 decades for him.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about-me')
        .setDescription('About the Saint Anonymous bot'),
        async execute(interaction) {
            await interaction.reply({content: message, ephemeral: true});
        }
}
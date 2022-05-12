const { SlashCommandBuilder } = require('@discordjs/builders');
const message = 'Hello, I am Saint Anonymous.\n\nMy calling is to share your prayers anonymously. I am ordained by Joshua Cadavez, the almighty but humble tech master.\n\nRevere him with 10 decades of the Rosary.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about-me')
        .setDescription('About the Saint Anonymous bot'),
        async execute(interaction) {
            await interaction.reply({content: message, ephemeral: true});
        }
}
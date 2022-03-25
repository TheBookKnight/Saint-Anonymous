const { SlashCommandBuilder } = require('@discordjs/builders');
const message = 'Hello, my name is Saint Anonymous.\n\nMy calling is to share your prayers anonymously. I am ordained by Joshua Cadavez, the almighty but humble tech master.\n\nRevere him by dedicating 10 decades of the Rosary.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about-me')
        .setDescription('About the Saint Anonymous bot'),
        async execute(interaction) {
            await interaction.reply({content: message, ephemeral: true});
        }
}
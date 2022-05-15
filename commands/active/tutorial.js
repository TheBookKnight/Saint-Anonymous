const { SlashCommandBuilder } = require('@discordjs/builders');

const tutorialPrayer = 'Directly message Saint Anonymous your prayer. It will share it to the #prayer-requests channel anonymously.'
const tutorialMusic = 'Slash command `/play-music` followed by the YouTube video url. It will start playing it in the #music channel.'

const message = `To use Saint Anonymous...\n\n${tutorialPrayer}\n\n${tutorialMusic}`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tutorial')
        .setDescription('How to use Saint Anonymous'),
        async execute(interaction) {
            await interaction.reply({content: message, ephemeral: true});
        }
}
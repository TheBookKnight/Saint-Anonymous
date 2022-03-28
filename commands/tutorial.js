const { SlashCommandBuilder } = require('@discordjs/builders');

const tutorialDMBot = 'Directly message Saint Anonymous your prayer. It will share it to the #prayer-requests channel anonymously. Only works if it has one.'
const tutorialMusic = 'Slash command "/play-music" followed by the YouTube video url. It will start playing it in the #music channel. Only works if it has one.'

const message = `To use Saint Anonymous...\n\n${tutorialDMBot}\n\n${tutorialMusic}`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tutorial')
        .setDescription('How to use Saint Anonymous'),
        async execute(interaction) {
            await interaction.reply({content: message, ephemeral: true});
        }
}
const { SlashCommandBuilder } = require('@discordjs/builders');

const tutorialPublicPrayer = 'In its server, type "\/public-prayer" followed by your prayer. It will publicly share it to the respective channel.'
const tutorialAnonymousPrayer = 'In its server, type "\/anon-prayer" followed by your prayer. It will anonymously share it to the respective channel.'
const tutorialDMBot = 'Directly message Saint Anonymous your prayer. It will share it to the #prayer-requests channel anonymously. Only works if it has one.'

const message = `To use Saint Anonymous...\n\n${tutorialPublicPrayer}\n\n${tutorialAnonymousPrayer}\n\n${tutorialDMBot}`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tutorial')
        .setDescription('How to use Saint Anonymous'),
        async execute(interaction) {
            await interaction.reply({content: message, ephemeral: true});
        }
}
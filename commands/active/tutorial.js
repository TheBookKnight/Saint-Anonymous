const { SlashCommandBuilder } = require('@discordjs/builders');

const tutorials = [
    '**DM** Saint Anonymous your prayer. It will share it to the #prayers channel.\n\n',
    'Slash command `/praise {your praise}`. It will share it to the #prayers channel.\n\n',
    'Slash command `/rosary`. It will assign Rosary roles via people in the Rosary voice channel.\n\n',
    'Slash command `/sing {YouTube URL}`. It will start playing it in the #music channel. To stop it, slash command `/hush`.'
]

const message = `To use Saint Anonymous, it'll do the following for you anonymously...\n\n${tutorials.join('')}`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tutorial')
        .setDescription('How to use Saint Anonymous'),
        async execute(interaction) {
            await interaction.reply({content: message, ephemeral: true});
        }
}
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anonymous-prayer')
        .setDescription('I will share your prayer whether anonymously or not.')
        .addStringOption(option => option
            .setName('anonymity')
            .setDescription('Would you like to be anonymous?')
            .setRequired(true)
            .addChoice('Yes', 'Anonymous')
            .addChoice('No', 'Public'))
        .addStringOption(option => option
            .setName('prayer')
            .setDescription(`What's your prayer, young child?`)
            .setRequired(true)),
        async execute(interaction) {
            const prayer = `Please pray for below:\n${interaction.options.getString('prayer')}`;
            let requester = interaction.options.getString('anonymity');
            let status = requester === 'Anonymous';
            requester = `\n\nRequester is: ${status ? requester : interaction.user.tag}`
            if (status) {
                await interaction.reply({ content: 'You sent a prayer!', ephemeral: true});
                await interaction.followUp(`${prayer}${requester}`);
            } else {
                await interaction.reply(`${prayer}${requester}`);
            }
        }
}
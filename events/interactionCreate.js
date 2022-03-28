module.exports = {
	name: 'interactionCreate',
	execute(client, guildId, interaction) {
		console.log(`${interaction.user.tag} in Guild #${guildId}'s #${interaction.channel.name} triggered an interaction.`);
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			command.execute(interaction)
		} catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
		}
	},
};
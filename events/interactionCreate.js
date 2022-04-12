module.exports = {
	name: 'interactionCreate',
	execute(client, guildId, interaction) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			command.execute(interaction)
		} catch (error) {
			console.error(error);
			interaction.reply({ content: `There was an error while executing the command ${interaction.commandName}!`, ephemeral: true })
		}
	},
};
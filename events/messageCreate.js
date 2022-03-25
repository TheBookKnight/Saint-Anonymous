module.exports = {
	name: 'messageCreate',
	execute(client, message) {
        if (message.channel.type === "DM" && message.author.id !== client.user.id) {
            return message.reply({ content: `${message.content} : ${message.author.id} : ${ client.user.id}` });
        }
	},
};

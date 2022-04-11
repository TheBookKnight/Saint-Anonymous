const { SlashCommandBuilder } = require('@discordjs/builders');
const message = 'Hello, I am Saint Anonymous.\n\nMy calling is to share your prayers anonymously. I am ordained by Joshua Cadavez, the almighty but humble tech master.\n\nRevere him with 10 decades of the Rosary.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rosary')
        .setDescription('Assign Rosary roles'),
        async execute(interaction) {
            let rosaryChannel = await interaction.guild.channels.fetch()
                .then(channels => {
                    const targetChannel = channels.find(channel => {
                        return channel.name.toLowerCase().includes("rosary") && channel.type == 'GUILD_VOICE'
                    })
                    return targetChannel;
                })
                
            if (typeof rosaryChannel === 'undefined') {
                return await interaction.reply({content: "There's no #rosary Voice channel. Please create one before trying again.", ephemeral: true});
            }
            let members = rosaryChannel.members;
            members = Array.from(members, ([id, info]) => ({id}));
            
            // randomizes choice
            let choose = Math.floor(Math.random() * members.length);

            let decades = ['1st Decade:\t', '2nd Decade:\t', '3rd Decade:\t', '4th Decade:\t', '5th Decade:\t']
            for(let decade=0; decade<decades.length; decade++) {
                decades[decade] = decades[decade] + `<@!${members[choose].id}>`;
                choose = (choose + 1) % members.length;
            }
            choose = (choose + 1) % members.length;
            decades.unshift(
                'VIRTUAL ROSARY',
                `Read Mysteries:\t<@!${members[choose].id}>`)
            decades = decades.join('\n');
            console.log(decades);
            interaction.reply({content: decades, ephemeral: true});
        }
}
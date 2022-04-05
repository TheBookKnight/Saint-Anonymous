const { SlashCommandBuilder } = require('@discordjs/builders');
const play = require('play-dl')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play-music')
        .setDescription('Play music.')
        .addStringOption(option => option
            .setName('youtube')
            .setDescription("What YouTube audio you wanted to play?")
            .setRequired(true)),
        async execute(interaction) {
            const url = interaction.options.getString('youtube');
            const linkCheck = require('link-check');

            try {
                linkCheck(url, async function (err, result) {
                    if (err) { throw new Error("Your url input is invalid."); }
                    console.log(`${result.link} is ${result.status}`);
                });
            } catch(error) {
                console.log('------------------------------')
                console.log('LINK ERROR')
                console.log(error)
                console.log('------------------------------')
                return await interaction.reply({content: "Not a valid YouTube url.", ephemeral: true});
            }
            
            const {
                AudioPlayerStatus,
                createAudioPlayer,
                createAudioResource,
                joinVoiceChannel,
            } = require('@discordjs/voice');

            let musicChannel = await interaction.guild.channels.fetch()
                .then(channels => {
                    const targetChannel = channels.find(channel => {
                        return channel.name.toLowerCase().includes("music") && channel.type == 'GUILD_VOICE'
                    })
                    return targetChannel;
                })
                
            if (typeof musicChannel === 'undefined') {
                return await interaction.reply({content: "There's no #music Voice channel. Please create one before trying again.", ephemeral: true});
            }

            const connection = joinVoiceChannel({
                channelId: musicChannel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            try {
                let { stream, type } = await play.stream(url, {});
                const resource = createAudioResource(stream, { inputType: type });
                const player = createAudioPlayer();
    
                player.play(resource);
                connection.subscribe(player);
                player.on(AudioPlayerStatus.Idle, () => connection.destroy());

                interaction.reply({content: `Playing music from ${url} on channel <#${musicChannel.id}>`, ephemeral: true});
            } catch (error) {
                console.log('------------------------------')
                console.log('STREAM ERROR')
                console.log(error)
                console.log('------------------------------')
                interaction.reply({content: 'There was an issue playing the YouTube video.', ephemeral: true});
            }
        }
}
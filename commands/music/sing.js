const { SlashCommandBuilder } = require('@discordjs/builders');
const play = require('play-dl')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sing')
        .setDescription('Plays YouTube audio in the Music Channel.')
        .addStringOption(option => option
            .setName('youtube')
            .setDescription("What YouTube audio you wanted to play?")
            .setRequired(true)),
        async execute(interaction) {
            let url = interaction.options.getString('youtube');
            const linkCheck = require('link-check');

            try {
                linkCheck(url, async function (err, result) {
                    if (err) { throw new Error("Your url input is invalid."); }
                    console.log(`${result.link} is ${result.status}`);
                });
                url = new URL(url);
            } catch(error) {
                console.log('----------LINK ERROR----------')
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
                return await interaction.reply({content: "There's no Music Voice channel. Please create one before trying again.", ephemeral: true});
            }

            const connection = joinVoiceChannel({
                channelId: musicChannel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            try {
                let seconds;
                if (url.searchParams) {
                    seconds = url.searchParams.get('t') ? Number(url.searchParams.get('t').replace('s','')) : 0;
                } else {
                    interaction.reply({content: `The below url should have the hostname **www.youtube.com**:\n${url.toString()}`, ephemeral: true})
                    throw new Error('Invalid URL.')
                }
                let { stream, type } = await play.stream(url.toString(), { seek: seconds });
                const resource = createAudioResource(stream, { inputType: type });
                const player = createAudioPlayer();
    
                player.play(resource);
                connection.subscribe(player);
                player.on(AudioPlayerStatus.Idle, () => connection.destroy());

                interaction.reply({content: `Playing on channel <#${musicChannel.id}>\n${url}`, ephemeral: true});
            } catch (error) {
                console.log('--------STREAM ERROR----------')
                console.log(error)
                console.log('------------------------------')
                interaction.reply({content: 'There was an issue playing the YouTube video.', ephemeral: true});
            }
        }
}
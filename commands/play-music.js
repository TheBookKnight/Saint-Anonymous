const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');

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
                console.log(`Error:\t${error.message}`)
                return await interaction.reply({content: "Not a valid YouTube url.", ephemeral: true});
            }
            
            const {
                AudioPlayerStatus,
                StreamType,
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
            const stream = ytdl(url, { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => connection.destroy());
            interaction.reply({content: `Playing music from ${url}.`, ephemeral: true});
        }
}
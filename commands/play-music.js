const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play-music')
        .setDescription('Play music.'),
        async execute(message, args) {
            const {
                AudioPlayerStatus,
                StreamType,
                createAudioPlayer,
                createAudioResource,
                joinVoiceChannel,
            } = require('@discordjs/voice');

            let musicChannel = await message.guild.channels.fetch()
                .then(channels => {
                    const targetChannel = channels.find(channel => {
                        return channel.name.toLowerCase().includes("music") && channel.type == 'GUILD_VOICE'
                    })
                    return targetChannel;
                })
                
            if (typeof musicChannel === 'undefined') {
                return await message.reply({content: "There's no #music Voice channel. Please create one before trying again.", ephemeral: true});
            }

            const url = 'https://www.youtube.com/watch?v=nCf3VA-asuM';

            const connection = joinVoiceChannel({
                channelId: musicChannel.id,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            const stream = ytdl(url, { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => connection.destroy());
            message.reply({content: "Playing music.", ephemeral: true});
        }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play-music')
        .setDescription('Play music.'),
        async execute(message, guildId, args) {
            const {
                AudioPlayerStatus,
                StreamType,
                createAudioPlayer,
                createAudioResource,
                joinVoiceChannel,
            } = require('@discordjs/voice');

            const url = 'https://www.youtube.com/watch?v=nCf3VA-asuM';

            const connection = joinVoiceChannel({
                channelId: '957462323734396969',
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
import acrcloud from 'acrcloud';

const shazamCommand = {
  name: 'shazam',
  description: 'Identify a song from an audio or video',
  category: 'Media',

  async execute(m, Matrix, args) {
    try {
      const p = m.quoted ? m.quoted : m;
      const mime = p.mimetype || '';

      if (!/audio|video/.test(mime)) {
        await Matrix.sendMessage(m.from, { text: '🎧 Please reply to an audio or video file to identify.' }, { quoted: m });
        return;
      }

      const waiting = await Matrix.sendMessage(m.from, { text: '🎶 *Listening to the track... please wait.*' }, { quoted: m });

      const buffer = await p.download();
      if (!buffer) {
        await Matrix.sendMessage(m.from, { text: '❌ Failed to download the media file.' }, { quoted: m });
        return;
      }

      const acr = new acrcloud({
        host: 'identify-ap-southeast-1.acrcloud.com',
        access_key: '6ab51323d0971429efbc32743c3b6e01',
        access_secret: 'iFbOFUI9rVrQPf7WN5BzcpPnQoCTPJ3JdMkAgrU8'
      });

      const result = await acr.identify(buffer);

      if (result.status.code !== 0) {
        await Matrix.sendMessage(m.from, { text: `❌ No match found: ${result.status.msg}` }, { quoted: m });
        await Matrix.sendMessage(m.from, { react: { text: '❌', key: waiting.key } });
        return;
      }

      const music = result.metadata.music[0];
      const { title, artists, album, genres, release_date } = music;

      const response = `
╭━━━〔 🎶 *TRACK IDENTIFIED* 🎶 〕━━━⊰
┃  
┃ 🎵 *Title:* ${title}
┃ 🎤 *Artist(s):* ${artists.map(a => a.name).join(', ')}
${album ? `┃ 💿 *Album:* ${album.name}\n` : ''}${genres ? `┃ 🎶 *Genre:* ${genres.map(g => g.name).join(', ')}\n` : ''}
┃ 🗓️ *Released:* ${release_date}
┃  
┃ 🎧 Track recognized successfully!
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊱
      `;

      await Matrix.sendMessage(m.from, { text: response.trim() }, { quoted: m });
      await Matrix.sendMessage(m.from, { react: { text: '🎧', key: waiting.key } });

    } catch (err) {
      console.error('[SHAZAM ERROR]:', err);
      await Matrix.sendMessage(m.from, { text: '❌ An error occurred while identifying the track.' }, { quoted: m });
    }
  }
};

export default shazamCommand;

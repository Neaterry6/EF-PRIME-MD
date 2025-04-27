import acrcloud from 'acrcloud';

const shazamCommand = {
  name: 'shazam',
  description: 'Identify a song from an audio or video message',
  category: 'Media',

  async execute(m, Matrix, args) {
    try {
      const quoted = m.quoted ? m.quoted : m;
      const mime = (quoted.mimetype || '');

      if (!/audio|video/.test(mime)) {
        await Matrix.sendMessage(m.from, { text: '🎧 *Tag an audio or video message to recognize.*' }, { quoted: m });
        return;
      }

      const processingMsg = await Matrix.sendMessage(m.from, { text: '🎶 *Listening and identifying your track...*' }, { quoted: m });

      const buffer = await quoted.download();

      const acr = new acrcloud({
        host: 'identify-ap-southeast-1.acrcloud.com',
        access_key: '6ab51323d0971429efbc32743c3b6e01',
        access_secret: 'iFbOFUI9rVrQPf7WN5BzcpPnQoCTPJ3JdMkAgrU8'
      });

      const result = await acr.identify(buffer);

      if (result.status.code !== 0) {
        await Matrix.sendMessage(m.from, { text: `❌ *Failed:* ${result.status.msg}` }, { quoted: m });
        await Matrix.sendMessage(m.from, { react: { text: '❌', key: processingMsg.key } });
        return;
      }

      const music = result.metadata.music[0];
      const title = music.title || 'Unknown';
      const artists = music.artists.map(a => a.name).join(', ') || 'Unknown';
      const album = music.album ? music.album.name : 'Unknown';
      const releaseDate = music.release_date || 'Unknown';
      const genre = music.genres ? music.genres.map(g => g.name).join(', ') : 'Unknown';

      const finalResult = `
╭━━━〔 🎶 *TRACK IDENTIFIED* 🎶 〕━━━⊰
┃  
┃ 🎵 *Title:* ${title}
┃ 🎤 *Artist(s):* ${artists}
┃ 💿 *Album:* ${album}
┃ 🎶 *Genre:* ${genre}
┃ 🗓️ *Released:* ${releaseDate}
┃  
┃ 🎧 *Recognized successfully!*  
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊱
      `.trim();

      await Matrix.sendMessage(m.from, { text: finalResult }, { quoted: m });
      await Matrix.sendMessage(m.from, { react: { text: '🎧', key: processingMsg.key } });

    } catch (error) {
      console.error('[SHAZAM CMD ERROR]:', error);
      await Matrix.sendMessage(m.from, { text: '❌ *Couldn\'t recognize the track. Try again later.*' }, { quoted: m });
    }
  }
};

export default shazamCommand;

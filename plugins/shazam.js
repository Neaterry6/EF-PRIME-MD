import acrcloud from 'acrcloud';
import chalk from 'chalk';

const shazam = {
  name: 'shazam',
  description: 'Identify a song from an audio/video',
  category: 'Media',
  async execute(m, sock, args) {
    try {
      const p = m.quoted ? m.quoted : m;
      const mime = (p.mimetype || '');

      if (!/audio|video/.test(mime)) {
        await sock.sendMessage(m.from, { text: '🎧🎤 *Tag an audio or video file for analysis.*' }, { quoted: m });
        return;
      }

      // Send awaiting message
      const awaitingMessage = await sock.sendMessage(m.from, { text: '🎶 *Listening and identifying your track...*' }, { quoted: m });

      // Download the media
      const buffer = await p.download();

      // Initialize acrcloud
      const acr = new acrcloud({
        host: 'identify-ap-southeast-1.acrcloud.com',
        access_key: '6ab51323d0971429efbc32743c3b6e01',
        access_secret: 'iFbOFUI9rVrQPf7WN5BzcpPnQoCTPJ3JdMkAgrU8'
      });

      // Identify track
      const { status, metadata } = await acr.identify(buffer);

      if (status.code !== 0) {
        await sock.sendMessage(m.from, { text: `❌ *Failed:* ${status.msg}` }, { quoted: m });
        await sock.sendMessage(m.from, { react: { text: '❌', key: awaitingMessage.key } });
        return;
      }

      const { title, artists, album, genres, release_date } = metadata.music[0];

      // Styled result box
      const result = `
╭━━━〔 🎶 *SONG IDENTIFIED* 🎶 〕━━━⊰  
┃  
┃ 🎵 *Title:* ${title}
┃ 🎤 *Artist(s):* ${artists.map(v => v.name).join(', ')}
${album ? `┃ 💿 *Album:* ${album.name}\n` : ''}${genres ? `┃ 🎶 *Genre:* ${genres.map(v => v.name).join(', ')}\n` : ''}
┃ 🗓️ *Released:* ${release_date}
┃  
┃ 🎧🎤 *Track successfully recognized!*  
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊱  
      `;

      await sock.sendMessage(m.from, { text: result.trim() }, { quoted: m });
      await sock.sendMessage(m.from, { react: { text: '🎧🎤', key: awaitingMessage.key } });
      console.log(chalk.green('[SHAZAM] Track identified successfully.'));

    } catch (err) {
      console.error(chalk.red('[SHAZAM ERROR]:'), err);
      await sock.sendMessage(m.from, { text: '❌🎧 *Couldn\'t recognize the track. Try again later.*' }, { quoted: m });
    }
  }
};

export default shazam;

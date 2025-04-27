import acrcloud from 'acrcloud';
import fs from 'fs';

const shazam = {
  name: 'shazam',
  description: 'Identify music in a tagged video/audio',
  category: 'Media',
  async execute(m, sock, args) {
    try {
      const mime = (m.quoted || m.msg).mimetype || '';
      if (!/video|audio/.test(mime)) return m.reply('🎵 *Tag a short audio or video for me to identify, King!*');

      const acr = new acrcloud({
        host: 'identify-ap-southeast-1.acrcloud.com',
        access_key: '6ab51323d0971429efbc32743c3b6e01',
        access_secret: 'iFbOFUI9rVrQPf7WN5BzcpPnQoCTPJ3JdMkAgrU8'
      });

      const p = m.quoted ? m.quoted : m;
      const buffer = await p.download();

      const { status, metadata } = await acr.identify(buffer);
      if (status.code !== 0) return m.reply(`❌ *${status.msg}*`);

      const { title, artists, album, genres, release_date } = metadata.music[0];
      const resultText = `
╭━━〔 🎶 *𝗦𝗢𝗡𝗚 𝗜𝗗𝗘𝗡𝗧𝗜𝗙𝗜𝗘𝗗* 🎶 〕━━━⊰
┃ 🎧 *Title:* ${title}
┃ 🎙️ *Artist(s):* ${artists ? artists.map(v => v.name).join(', ') : 'N/A'}
┃ 💽 *Album:* ${album ? album.name : 'N/A'}
┃ 🎼 *Genre:* ${genres ? genres.map(v => v.name).join(', ') : 'N/A'}
┃ 📅 *Release Date:* ${release_date || 'Unknown'}
╰━━━━━━━━━━━━━━━━━━━━━━⊱
      `.trim();

      await m.reply(resultText);

    } catch (error) {
      console.error(error);
      await m.reply('❌ *Could not recognize this track. Maybe try a clearer or shorter clip.*');
    }
  }
};

export default shazam;

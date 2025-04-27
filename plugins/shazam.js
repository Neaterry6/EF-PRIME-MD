import acrcloud from 'acrcloud';
import { Buffer } from 'buffer';

const shazam = {
  name: 'shazam',
  description: 'Identify a song from an audio or video file',
  category: 'Media',
  async execute(m, sock, args) {
    try {
      const p = m.quoted ? m.quoted : m;
      const mime = p.mimetype || '';

      if (!/audio|video/.test(mime)) {
        await sock.sendMessage(m.from, { text: '🎧🎤 *Tag an audio or video file for analysis.*' }, { quoted: m });
        return;
      }

      const awaitingMessage = await sock.sendMessage(m.from, { text: '🎶 *Listening and identifying your track...*' }, { quoted: m });

      const stream = await p.download();
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);

      const acr = new acrcloud({
        host: 'identify-ap-southeast-1.acrcloud.com',
        access_key: '6ab51323d0971429efbc32743c3b6e01',
        access_secret: 'iFbOFUI9rVrQPf7WN5BzcpPnQoCTPJ3JdMkAgrU8'
      });

      const { status, metadata } = await acr.identify(buffer);

      if (status.code !== 0 || !metadata?.music?.length) {
        await sock.sendMessage(m.from, { text: `❌ *Couldn’t recognize the track.*` }, { quoted: m });
        await sock.sendMessage(m.from, { react: { text: '❌', key: awaitingMessage.key } });
        return;
      }

      const track = metadata.music[0];

      const result = `
╭━━━〔 🎶 *SONG IDENTIFIED* 🎶 〕━━━⊰
┃  
┃ 🎵 *Title:* ${track.title}
┃ 🎤 *Artist(s):* ${track.artists?.map(v => v.name).join(', ') || 'N/A'}
${track.album ? `┃ 💿 *Album:* ${track.album.name}\n` : ''}${track.genres ? `┃ 🎶 *Genre:* ${track.genres.map(v => v.name).join(', ')}\n` : ''}
┃ 🗓️ *Released:* ${track.release_date || 'Unknown'}
┃  
┃ 🎧🎤 *Track successfully recognized!*  
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊱
      `;

      await sock.sendMessage(m.from, { text: result.trim() }, { quoted: m });
      await sock.sendMessage(m.from, { react: { text: '🎧🎤', key: awaitingMessage.key } });

    } catch (err) {
      console.error('[SHAZAM ERROR]:', err);
      await sock.sendMessage(m.from, { text: '❌🎧 *Couldn\'t recognize the track. Try again later.*' }, { quoted: m });
    }
  }
};

export default shazam;

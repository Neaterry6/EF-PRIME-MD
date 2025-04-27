import axios from 'axios';

const s = async (m, Matrix, text) => {
  if (!text) {
    return await Matrix.sendMessage(m.from, { text: '❌ *Please provide a song name to search.*' }, { quoted: m });
  }

  const query = text.trim();
  await Matrix.sendMessage(m.from, { react: { text: "🎶", key: m.key } });

  try {
    const res = await axios.get(`https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(query)}`);
    const result = res.data;

    if (!result || !result.title) {
      return await Matrix.sendMessage(m.from, { text: '❌ *No results found for that track.*' }, { quoted: m });
    }

    const msg = `
╭━━━〔 🎵 *𝗦𝗢𝗡𝗚 𝗣𝗟𝗔𝗬𝗘𝗥* 🎵 〕━━━⊰  
┃ 🎶 *Title:* ${result.title}
┃ 🎤 *Artist:* ${result.artist || 'Unknown'}
┃ ⏱️ *Duration:* ${result.duration || 'Unknown'}
┃ 📅 *Fetched:* Successfully
┣━━━━━━━━━━━━━━━━━━━━━━  
┃ 🔗 *Source:* ${result.url || 'API'}
╰━━━━━━━━━━━━━━━━━━━━━━⊱`;

    await Matrix.sendMessage(m.from, {
      audio: { url: result.url },
      mimetype: 'audio/mpeg',
      ptt: false,
      caption: msg
    }, { quoted: m });

  } catch (err) {
    console.error(err.message);
    await Matrix.sendMessage(m.from, { text: '❌ *Failed to fetch song. Try another query.*' }, { quoted: m });
  }
};

export default s

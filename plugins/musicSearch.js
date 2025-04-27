import axios from 'axios';

const musicSearch = async (m, Matrix, text) => {
  if (!text) return await Matrix.sendMessage(m.from, { text: '❌ *Please provide a song title to search.*' }, { quoted: m });

  const query = text.trim();
  await Matrix.sendMessage(m.from, { react: { text: "🎶", key: m.key } });

  try {
    const res = await axios.get(`https://music-movie-search-api.onrender.com/api/music?q=${encodeURIComponent(query)}`);
    const result = res.data.data[0];

    if (!result) {
      return await Matrix.sendMessage(m.from, { text: '❌ *No music found for your query.*' }, { quoted: m });
    }

    const msg = `
╭━━━〔 🎵 *𝗠𝗨𝗦𝗜𝗖 𝗥𝗘𝗦𝗨𝗟𝗧* 🎵 〕━━━⊰  
┃ 🎶 *Title:* ${result.title}
┃ 🎙️ *Artist:* ${result.artist}
┃ 🗂️ *Album:* ${result.album}
┃ 📅 *Released:* ${result.year}
┣━━━━━━━━━━━━━━━━━━━━━━  
┃ 🔗 *Source:* ${result.source}
╰━━━━━━━━━━━━━━━━━━━━━━⊱`;

    await Matrix.sendMessage(m.from, { image: { url: result.cover }, caption: msg }, { quoted: m });

  } catch (err) {
    console.error(err.message);
    await Matrix.sendMessage(m.from, { text: '❌ *Music search failed. Try again later.*' }, { quoted: m });
  }
};

export default musicSearch

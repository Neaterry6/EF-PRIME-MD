import axios from 'axios';

const anime = async (m, Matrix) => {
  const prefix = '.anime';
  if (!m.body.startsWith(prefix)) return;

  const query = m.body.slice(prefix.length).trim();
  if (!query) {
    return await Matrix.sendMessage(m.from, { text: '🎌 *Please enter an anime title.*\nExample: `.anime One Piece`' }, { quoted: m });
  }

  await Matrix.sendMessage(m.from, { react: { text: "🎀", key: m.key } });

  try {
    const res = await axios.get(`https://anime-api-js7o.onrender.com/api/anime?query=${encodeURIComponent(query)}`);
    const result = res.data.data[0];

    if (!result) {
      return await Matrix.sendMessage(m.from, { text: `❌ *Anime not found for:* ${query}` }, { quoted: m });
    }

    // Build caption
    const animeText = `
╭━━━〔 🎌 *𝗔𝗡𝗜𝗠𝗘 𝗙𝗜𝗟𝗘* 🎌 〕━━━⊰  
┃ 🎞️ *Title:* ${result.title}
┃ 🎥 *Episodes:* ${result.episodes}
┃ ⭐ *Score:* ${result.score}
┃ 🏷️ *Genres:* ${result.genres.join(", ")}
┣━━━━━━━━━━━━━━━━━━━━━━  
┃ 📖 *Synopsis:*  
┃ ${result.synopsis}
╰━━━━━━━━━━━━━━━━━━━━━━⊱`;

    // Send cover image (if image url was in your actual API, assuming e.g. result.image)
    await Matrix.sendMessage(m.from, {
      image: { url: result.coverImage || 'https://i.imgur.com/U3YqK5s.png' }, // replace with real image if API gives it
      caption: animeText
    }, { quoted: m });

  } catch (error) {
    console.error("Anime API error:", error.message || error);
    await Matrix.sendMessage(m.from, { text: '❌ *Error fetching anime details.*' }, { quoted: m });
  }
};

export default anime

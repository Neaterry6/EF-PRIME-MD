import axios from 'axios';

const anime = async (m, Matrix) => {
  const prefix = '.';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;
  if (!body || !body.startsWith(prefix)) return;

  const [cmd, ...args] = body.slice(prefix.length).split(' ');
  if (cmd !== 'anime') return;

  const query = args.join(' ');
  if (!query) {
    return await Matrix.sendMessage(m.from, {
      text: '🎌 *Please enter an anime title.*\nExample: `.anime Naruto`'
    }, { quoted: m });
  }

  await Matrix.sendMessage(m.from, { react: { text: "🎀", key: m.key } });

  try {
    const res = await axios.get(`https://anime-api-js7o.onrender.com/api/anime?query=${encodeURIComponent(query)}`);
    const result = res.data.data[0];

    if (!result) {
      return await Matrix.sendMessage(m.from, { text: `❌ *Anime not found for:* ${query}` }, { quoted: m });
    }

    // Caption with anime details
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

    // Send with placeholder image since API doesn't provide one
    await Matrix.sendMessage(m.from, {
      image: { url: 'https://i.imgur.com/U3YqK5s.png' },
      caption: animeText
    }, { quoted: m });

  } catch (error) {
    console.error("Anime API error:", error.message || error);
    await Matrix.sendMessage(m.from, {
      text: '❌ *Error fetching anime details.*'
    }, { quoted: m });
  }
};

export default anime;

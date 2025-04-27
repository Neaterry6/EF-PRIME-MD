import axios from 'axios';

const anime = async (m, Matrix) => {
  const prefix = '.';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;

  // Ensure message exists and starts with prefix
  if (!body || !body.startsWith(prefix)) return;

  const [cmd, ...args] = body.slice(prefix.length).split(' ');
  if (cmd !== 'ani') return;

  const query = args.join(' ');
  if (!query) {
    return await Matrix.sendMessage(m.from, {
      text: '🎌 *Please enter an anime title.*\nExample: `.anime Naruto`'
    }, { quoted: m });
  }

  await Matrix.sendMessage(m.from, { react: { text: "🎀", key: m.key } });

  const apiUrl = `https://anime-api-js7o.onrender.com/api/anime?query=${encodeURIComponent(query)}`;

  try {
    const res = await axios.get(apiUrl, { timeout: 10000 }); // Set timeout to prevent hanging requests

    console.log("API Response:", res.data); // Debugging log

    // Validate response structure
    if (!res.data || !res.data.data || res.data.data.length === 0) {
      return await Matrix.sendMessage(m.from, {
        text: `❌ *Anime not found for:* ${query}`
      }, { quoted: m });
    }

    const result = res.data.data[0];

    // Ensure valid anime details exist
    const animeText = `
╭━━━〔 🎌 *𝗔𝗡𝗜𝗠𝗘 𝗙𝗜𝗟𝗘* 🎌 〕━━━⊰  
┃ 🎞️ *Title:* ${result.title ?? "Unknown"}
┃ 🎥 *Episodes:* ${result.episodes ?? "Unknown"}
┃ ⭐ *Score:* ${result.score ?? "N/A"}
┃ 🏷️ *Genres:* ${result.genres?.join(", ") ?? "Not specified"}
┣━━━━━━━━━━━━━━━━━━━━━━  
┃ 📖 *Synopsis:*  
┃ ${result.synopsis ?? "No synopsis available."}
╰━━━━━━━━━━━━━━━━━━━━━━⊱`;

    await Matrix.sendMessage(m.from, {
      image: { url: result.image || 'https://i.imgur.com/U3YqK5s.png' }, // Fallback image
      caption: animeText
    }, { quoted: m });

  } catch (error) {
    console.error("Anime API Error:", error.response?.data || error.message);
    await Matrix.sendMessage(m.from, {
      text: `❌ *Error fetching anime details. (${error.message})*`
    }, { quoted: m });
  }
};

export default ani;

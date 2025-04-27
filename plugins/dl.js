import axios from 'axios';

const videoDownload = async (m, Matrix, text) => {
  if (!text) return await Matrix.sendMessage(m.from, { text: '❌ *Please provide a video URL to download.*' }, { quoted: m });

  const url = text.trim();
  await Matrix.sendMessage(m.from, { react: { text: "⏬", key: m.key } });

  try {
    const res = await axios.get(`https://alldl-wnld.onrender.com/api/download?url=${encodeURIComponent(url)}`);
    const result = res.data;

    if (!result || !result.video) {
      return await Matrix.sendMessage(m.from, { text: '❌ *Unable to fetch video for this URL.*' }, { quoted: m });
    }

    const msg = `
╭━━━〔 📥 *𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗* 📥 〕━━━⊰  
┃ 🎬 *Title:* ${result.title || 'Unknown'}
┃ 📦 *Size:* ${result.size || 'Unknown'}
┃ 📅 *Downloaded:* Successfully
┣━━━━━━━━━━━━━━━━━━━━━━  
┃ 🔗 *Source:* ${url}
╰━━━━━━━━━━━━━━━━━━━━━━⊱`;

    await Matrix.sendMessage(m.from, { video: { url: result.video }, caption: msg }, { quoted: m });

  } catch (err) {
    console.error(err.message);
    await Matrix.sendMessage(m.from, { text: '❌ *Failed to download video. Make sure the link is valid and try again.*' }, { quoted: m });
  }
};

export default videoDownload

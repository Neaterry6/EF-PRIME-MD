import axios from 'axios';

const dl = async (m, Matrix) => {
  const prefix = '.dl';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;
  
  // Ensure message exists and starts with the correct prefix
  if (!body || !body.startsWith(prefix)) return;

  const args = body.split(' ');
  if (args.length < 2) {
    return await Matrix.sendMessage(m.from, { text: `❌ *Usage:* ${prefix} <video link>` }, { quoted: m });
  }

  const videoUrl = args[1];
  const apiUrl = `https://alldl-wnld.onrender.com/api/download?url=${encodeURIComponent(videoUrl)}`;

  try {
    const res = await axios.get(apiUrl, { timeout: 15000 }); // Set timeout to avoid hanging requests

    console.log("API Response:", res.data); // Debugging log

    // Validate response structure
    if (!res.data || !res.data.video) {
      return await Matrix.sendMessage(m.from, { text: "❌ *Couldn't fetch download link. Try a different video.*" }, { quoted: m });
    }

    const videoLink = res.data.video;

    await Matrix.sendMessage(m.from, { text: "📥 *Downloading video... Please wait!*" }, { quoted: m });

    await Matrix.sendMessage(m.from, {
      video: { url: videoLink },
      mimetype: 'video/mp4',
      caption: "✅ *Here's your downloaded video!*"
    }, { quoted: m });

  } catch (err) {
    console.error("DL Command Error:", err.response?.data || err.message);
    await Matrix.sendMessage(m.from, {
      text: `❌ *Failed to download video. Error: ${err.message}*`
    }, { quoted: m });
  }
};

export default dl;

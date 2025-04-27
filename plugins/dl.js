import axios from 'axios';

const dl = async (m, Matrix) => {
  const prefix = '.dl';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;

  // Ensure message starts with the correct command
  if (!body || !body.startsWith(prefix)) return;

  const args = body.split(' ');
  if (args.length < 2) {
    return await Matrix.sendMessage(m.from, { text: `❌ *Usage:* ${prefix} <video link>` }, { quoted: m });
  }

  const videoUrl = args[1];
  const apiUrl = `https://alldl-wnld.onrender.com/api/download?url=${encodeURIComponent(videoUrl)}`;

  try {
    await Matrix.sendMessage(m.from, { text: "📥 *Processing your download... Please wait!*" }, { quoted: m });

    const res = await axios.get(apiUrl, { timeout: 15000 });
    console.log("Download API Response:", res.data); // Debugging log

    if (!res.data || !res.data.video) {
      throw new Error("No video link returned by API");
    }

    const videoLink = res.data.video;

    await Matrix.sendMessage(m.from, {
      video: { url: videoLink },
      mimetype: 'video/mp4',
      caption: "✅ *Here’s your downloaded video!* 🎬"
    }, { quoted: m });

  } catch (err) {
    console.error("DL Command Error:", err.response?.data || err.message);
    await Matrix.sendMessage(m.from, {
      text: `❌ *Failed to download video. Try another link or check the API.*`
    }, { quoted: m });
  }
};

export default dl;

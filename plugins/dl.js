import axios from 'axios';

const dl = async (m, Matrix) => {
  const prefix = '.dl';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;
  if (!body || !body.startsWith(prefix)) return;

  const args = body.split(' ');
  if (args.length < 2) {
    await Matrix.sendMessage(m.from, { text: `❌ *Usage:* ${prefix} <video link>` }, { quoted: m });
    return;
  }

  const videoUrl = args[1];
  const apiUrl = `https://alldl-wnld.onrender.com/api/download?url=${encodeURIComponent(videoUrl)}`;

  try {
    const res = await axios.get(apiUrl);
    const videoLink = res.data.video;

    if (!videoLink) {
      await Matrix.sendMessage(m.from, { text: "❌ *Couldn't fetch download link. Try a different video.*" }, { quoted: m });
      return;
    }

    await Matrix.sendMessage(m.from, { video: { url: videoLink }, mimetype: 'video/mp4' }, { quoted: m });

  } catch (err) {
    console.error("DL Command error:", err.message || err);
    await Matrix.sendMessage(m.from, { text: "❌ *Failed to download video. Check the link or try later.*" }, { quoted: m });
  }
};

export default dl;

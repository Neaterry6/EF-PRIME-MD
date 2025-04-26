import axios from 'axios';
import config from '../config.cjs';

const testapi = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const query = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd !== 'testapi') return;

  if (!query) {
    return Matrix.sendMessage(m.from, { text: "🚫 *Usage:* `.testapi [api-url]` 📌" }, { quoted: m });
  }

  await Matrix.sendMessage(m.from, { react: { text: "⚡", key: m.key } });
  await Matrix.sendMessage(m.from, { text: "🔎 *Testing API, please wait...*", }, { quoted: m });

  const apiUrl = query.trim();
  const start = Date.now();

  try {
    const response = await axios.get(apiUrl);
    const timeTaken = Date.now() - start;
    const imageUrl = response.data.image || null;

    const resultText = `🎯 *API RESPONSE* 🎯
━━━━━━━━━━━━━━━━━━━━━
🔗 *URL:* ${apiUrl}
✅ *Status:* ${response.status} ${response.statusText}
⏳ *Time Taken:* ${timeTaken}ms
📜 *Response Data:*
\`\`\`${JSON.stringify(response.data, null, 2).slice(0, 3000)}${JSON.stringify(response.data).length > 3000 ? '... (truncated)' : ''}\`\`\`
━━━━━━━━━━━━━━━━━━━━━`;

    await Matrix.sendMessage(m.from, { text: resultText }, { quoted: m });

    // Sending Image If Available
    if (imageUrl) {
      await Matrix.sendMessage(m.from, {
        image: { url: imageUrl },
        caption: "🖼️ *API Response Image* 🌟",
      }, { quoted: m });
    }

    await Matrix.sendMessage(m.from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    const timeTaken = Date.now() - start;
    const errorText = `🚨 *API ERROR* 🚨
━━━━━━━━━━━━━━━━━━━━━
🔗 *URL:* ${apiUrl}
❌ *Status:* ${error.response ? error.response.status : 'Unknown'} ${error.response ? error.response.statusText : 'Error'}
⏳ *Time Taken:* ${timeTaken}ms
⚠️ *Error Message:*
\`\`\`${error.message}\`\`\`
━━━━━━━━━━━━━━━━━━━━━`;

    console.error("API Test Error:", error);
    await Matrix.sendMessage(m.from, { text: errorText }, { quoted: m });
    await Matrix.sendMessage(m.from, { react: { text: "❌", key: m.key } });
  }
};

export default testapi;

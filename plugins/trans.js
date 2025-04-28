import axios from 'axios';

const translateReply = async (m, Matrix) => {
  const prefix = '.trans';

  // Ensure the message starts with the prefix
  if (!m.body.startsWith(prefix)) return;

  // Must be replying to a message with text
  if (!m.quoted || !m.quoted.text) {
    return await Matrix.sendMessage(m.from, {
      text: `❌ *Reply to a message you want to translate, like:*\n.trans fr`
    }, { quoted: m });
  }

  // Extract the target language code
  const targetLang = m.body.slice(prefix.length).trim();

  if (!targetLang) {
    return await Matrix.sendMessage(m.from, {
      text: `❌ *Please provide a target language code*\n\n*Example:*\n.trans fr`
    }, { quoted: m });
  }

  const textToTranslate = m.quoted.text;

  await Matrix.sendMessage(m.from, {
    react: { text: "🌐", key: m.key }
  });

  try {
    // API request to translate the text
    const res = await axios.post('https://translator-api-bhew.onrender.com/api/translate', {
      text: textToTranslate,
      sourceLang: 'auto',
      targetLang
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.data || !res.data.translatedText) {
      throw new Error('Invalid API response');
    }

    const translatedText = res.data.translatedText;

    // Stunning gradient-styled output
    const resultText = `
🟣🟢🟡🔵 *𝗧𝗥𝗔𝗡𝗦𝗟𝗔𝗧𝗢𝗥* 🔵🟡🟢🟣

📄 *Original:* _${textToTranslate}_  
🌍 *Target Language:* _${targetLang.toUpperCase()}_  

💬 *Translated Text:*  
🎀 *"${translatedText}"*  

⚡ *Powered by AI Translation*
━━━━━━━━━━━━━━━━━━━━━━━━
`;

    await Matrix.sendMessage(m.from, { text: resultText }, { quoted: m });

  } catch (error) {
    console.error("[Translation Error]:", error.message || error);
    await Matrix.sendMessage(m.from, {
      text: '❌ *Translation failed. Check your language code or try again later.*'
    }, { quoted: m });
  }
};

export default translateReply;

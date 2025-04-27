import axios from 'axios';

const translateReply = async (m, Matrix) => {
  const prefix = '.trans';
  if (!m.body.startsWith(prefix)) return;

  // Must be replying to a message
  if (!m.quoted || !m.quoted.text) {
    return await Matrix.sendMessage(m.from, {
      text: `❌ *Reply to a message you want to translate, like:*\n.trans fr`
    }, { quoted: m });
  }

  // Get target language
  const targetLang = m.body.slice(prefix.length).trim();

  if (!targetLang) {
    return await Matrix.sendMessage(m.from, {
      text: `❌ *Please provide a target language code*\n\n*Example:*\n.trans fr`
    }, { quoted: m });
  }

  const textToTranslate = m.quoted.text;

  await Matrix.sendMessage(m.from, { react: { text: "🌐", key: m.key } });

  try {
    const res = await axios.post('https://translator-api-bhew.onrender.com/api/translate', {
      text: textToTranslate,
      sourceLang: 'auto',
      targetLang
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const translatedText = res.data.translatedText;

    const resultText = `
╭━━━〔 🌐 *𝗧𝗥𝗔𝗡𝗦𝗟𝗔𝗧𝗢𝗥* 🌐 〕━━━⊰  
┃ 📝 *Original:* ${textToTranslate}
┃ 🎯 *To:* ${targetLang.toUpperCase()}
┣━━━━━━━━━━━━━━━━━━━━━━  
┃ 🔤 *Translated:*  
┃ ${translatedText}
╰━━━━━━━━━━━━━━━━━━━━━━⊱`;

    await Matrix.sendMessage(m.from, { text: resultText }, { quoted: m });

  } catch (error) {
    console.error("Translation error:", error.message || error);
    await Matrix.sendMessage(m.from, {
      text: '❌ *Translation failed. Check your language code or try again later.*'
    }, { quoted: m });
  }
};

export default translateReply

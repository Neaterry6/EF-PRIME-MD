import axios from 'axios';
import config from '../config.cjs';

const riddle = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd !== 'riddle') return;

  await Matrix.sendMessage(m.from, { react: { text: "🧠", key: m.key } });
  await Matrix.sendMessage(m.from, { text: "✨ *Summoning a mind-boggling riddle...* 🕵️‍♂️", }, { quoted: m });

  const apiUrl = `https://kaiz-apis.gleeze.com/api/riddles`;

  try {
    const response = await axios.get(apiUrl);
    const riddleData = response.data;

    if (riddleData && riddleData.riddle) {
      const riddleText = `
🌟 *𝗥𝗜𝗗𝗗𝗟𝗘 𝗧𝗜𝗠𝗘!* 🌟
━━━━━━━━━━━━━━━━━━━━━━━
🧩 *Question:*  
❝ ${riddleData.riddle} ❞  

🤔 *Think carefully...*  
⌛ *Answer will be revealed!*  
━━━━━━━━━━━━━━━━━━━━━━━
`;

      await Matrix.sendMessage(m.from, { text: riddleText }, { quoted: m });

      setTimeout(async () => {
        const answerText = `
🎉 *𝗔𝗡𝗦𝗪𝗘𝗥 𝗧𝗢 𝗧𝗛𝗘 𝗥𝗜𝗗𝗗𝗟𝗘!* 🎉
━━━━━━━━━━━━━━━━━━━━━━━
✨ *Answer:*  
💡 ${riddleData.answer}  

🧠 *Did you get it right?*  
━━━━━━━━━━━━━━━━━━━━━━━
`;

        await Matrix.sendMessage(m.from, { text: answerText }, { quoted: m });
        await Matrix.sendMessage(m.from, { react: { text: "✅", key: m.key } });
      }, 5000); // Adding suspense by delaying the answer!

    } else {
      await Matrix.sendMessage(m.from, { text: "❌ *Oops! No riddle available right now. Try again later!* 🙁" }, { quoted: m });
      await Matrix.sendMessage(m.from, { react: { text: "❌", key: m.key } });
    }
  } catch (error) {
    console.error("Riddle Fetch Error:", error.message || error);
    await Matrix.sendMessage(m.from, { text: "⚠️ *An error occurred while retrieving the riddle. Please try again later!* 😢" }, { quoted: m });
    await Matrix.sendMessage(m.from, { react: { text: "❌", key: m.key } });
  }
};

export default riddle

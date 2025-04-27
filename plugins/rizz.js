import axios from 'axios';

const rizz = async (m, Matrix) => {
  const prefix = '.rizz';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;
  if (!body || !body.startsWith(prefix)) return;

  const currentDate = new Date().toLocaleString("en-US", { timeZone: "UTC" });

  await Matrix.sendMessage(m.from, { react: { text: "💘", key: m.key } });

  await Matrix.sendMessage(m.from, {
    text: `✨ *Summoning the Ultimate Rizz Line...* 💭\n📅 *Date & Time:* ${currentDate}`,
  }, { quoted: m });

  const apiUrl = `https://pinkupline-api.onrender.com/random`;

  try {
    const response = await axios.get(apiUrl);
    const pickupLine = response.data.line;

    const rizzText = `
╭━━━〔 🎩 *𝗥𝗜𝗭𝗭 𝗠𝗔𝗦𝗧𝗘𝗥* 🎩 〕━━━⊰  
┃ 📅 *Date & Time:* ${currentDate}  
┃ 🔥 *𝗟𝗘𝗚𝗘𝗡𝗗𝗔𝗥𝗬 𝗟𝗜𝗡𝗘:*  
┃ 💘✨ ${pickupLine} ✨  
┃  
┃ 🤩 *Drop this and let the magic begin!*  
┃ 😏 *Will they fall for it?*  
┣━━━━━━━━━━━━━━━━━━━━━━  
┃ 🎭 *Confidence Level:* 💯  
┃ 🕶️ *Charm Activated:* ✅  
┃ 💡 *Guaranteed Effectiveness:* Unknown 😉  
╰━━━━━━━━━━━━━━━━━━━━━━⊱`;

    await Matrix.sendMessage(m.from, { text: rizzText }, { quoted: m });

  } catch (error) {
    console.error("Error fetching pickup line:", error.message || error);
    await Matrix.sendMessage(m.from, {
      text: "❌ *Oops! The Rizz Gods are sleeping... Try again later!* 😢"
    }, { quoted: m });
  }
};

export default rizz;

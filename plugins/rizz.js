import axios from 'axios';

const rizz = async (m, Matrix) => {
  const prefix = '.rizz';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;
  if (!body || !body.startsWith(prefix)) return;

  try {
    const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });

    // First message
    await Matrix.sendMessage(m.from, {
      text: `🕰️ *Preparing your Rizz...*\n📅 *Date & Time (UTC):* ${now}`
    }, { quoted: m });

    // Fetch Rizz line
    const res = await axios.get('https://pinkupline-api.onrender.com/random');
    const pickupLine = res.data.pickupLine;

    // Send styled pickup line
    await Matrix.sendMessage(m.from, {
      text: `╭━━━〔 🎩 *𝗥𝗜𝗭𝗭 𝗠𝗔𝗦𝗧𝗘𝗥* 🎩 〕━━━⊰  
┃ 💘✨ *Legendary Pickup Line:*  
┃ “${pickupLine}”  
┃  
┃ 🔥 *Drop this and let the magic unfold!*  
┃ 😏 *Will they fall for it? Only time will tell!*  
┣━━━━━━━━━━━━━━━━━━━━━━  
┃ 🎭 *Confidence Level:* 💯  
┃ 🕶️ *Charm Activated:* ✅  
┃ 💡 *Guaranteed Effectiveness:* Unknown 😉  
╰━━━━━━━━━━━━━━━━━━━━━━⊱`
    }, { quoted: m });

  } catch (err) {
    console.error('Rizz command error:', err.message);
    await Matrix.sendMessage(m.from, { text: `❌ *Failed to fetch Rizz line:* ${err.message}` }, { quoted: m });
  }
};

export default rizz;

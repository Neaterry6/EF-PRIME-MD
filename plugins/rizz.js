import axios from 'axios';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const cmd = 'rizz';

export const run = async (Matrix, m, { text, prefix }) => {
  try {
    // Send first hype message
    await Matrix.sendMessage(m.from, {
      text: `🔥 *𝐑𝐈𝐙𝐙 𝐌𝐎𝐃𝐄 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃!* 🔥\n\n🎩 *A legendary pickup line is being prepared for you...*`
    }, { quoted: m });

    await sleep(2500);

    // Fetch pickup line
    const res = await axios.get(`https://pinkupline-api.onrender.com/random`);

    console.log("API Response:", res.data); // log response for debugging

    const pickupLine = res.data?.line || "No pickup line found.";

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
    console.error("Rizz API error:", err.response?.data || err.message);
    await Matrix.sendMessage(m.from, {
      text: `❌ *Failed to fetch Rizz line.* Please try again later.`
    }, { quoted: m });
  }
};

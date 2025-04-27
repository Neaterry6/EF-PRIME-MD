import axios from 'axios';

export const cmd = 'rizz';

export const run = async (Matrix, m) => {
  try {
    // First hype message
    await Matrix.sendMessage(m.from, {
      text: `🔥 *𝐑𝐈𝐙𝐙 𝐌𝐎𝐃𝐄 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃!* 🔥\n\n🎩 *A legendary pickup line is being prepared for you...*`
    }, { quoted: m });

    // Wait for 2.5 seconds
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Fetch pickup line from your API
    const response = await axios.get('https://pinkupline-api.onrender.com/random');

    // Get the pickup line
    const pickupLine = response.data.line;

    // Send the fancy styled message with the pickup line
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

  } catch (error) {
    console.error(error);
    await Matrix.sendMessage(m.from, {
      text: `❌ *Failed to fetch Rizz line.* Please try again later.`
    }, { quoted: m });
  }
};

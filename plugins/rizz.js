import axios from 'axios';

const rizz = async (m, Matrix) => {
  const apiUrl = `https://pinkupline-api.onrender.com/random`;

  try {
    // Sending an awaiting message
    const awaitingMessage = await Matrix.sendMessage(m.from, { text: "🎩 *Summoning the Ultimate Rizz Line...* 💭" }, { quoted: m });

    // Fetch the Rizz pickup line
    const response = await axios.get(apiUrl);
    const pickupLine = response.data.line;

    // Delete the awaiting message after 3 seconds
    setTimeout(async () => {
      await Matrix.deleteMessage(m.from, awaitingMessage.key);
    }, 3000);

    // Send the Rizz pickup line in a stylish format
    const rizzText = `
╭━━━〔 🎩 *𝗥𝗜𝗭𝗭 𝗠𝗔𝗦𝗧𝗘𝗥* 🎩 〕━━━⊰  
┃ 💘✨ *Legendary Pickup Line:*  
┃ “${pickupLine}”  
┃  
┃ 🔥 *Drop this and let the magic unfold!*  
┃ 😏 *Will they fall for it? Only time will tell!*  
┣━━━━━━━━━━━━━━━━━━━━━━  
┃ 🎭 *Confidence Level:* 💯  
┃ 🕶️ *Charm Activated:* ✅  
┃ 💡 *Guaranteed Effectiveness:* Unknown 😉  
╰━━━━━━━━━━━━━━━━━━━━━━⊱`;

    await Matrix.sendMessage(m.from, { text: rizzText }, { quoted: m });

  } catch (error) {
    console.error("Error fetching Rizz line:", error.message);
    await Matrix.sendMessage(m.from, { text: "❌ *Oops! The Rizz Gods are unavailable right now... Try again later!* 😢" }, { quoted: m });
  }
};

export default rizz;

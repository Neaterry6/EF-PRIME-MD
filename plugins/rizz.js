import axios from "axios";
import config from "../config.cjs";

const pickup = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

  if (cmd === "pickup") {
    try {
      const start = new Date().getTime();

      // Fetch a random pickup/rizz line from the API
      const response = await axios.get("https://pinkupline-api.onrender.com/random");
      const pickupLine = response.data.line;

      // Get current date & time
      const now = new Date();
      const dateTime = now.toLocaleString("en-US", { timeZone: "UTC" });

      const reactionEmojis = ["❤️", "😍", "😘", "💖", "🔥", "😉", "😏", "✨", "🥰", "🎯"];
      const textEmojis = ["🌹", "💎", "🎶", "💌", "🌠", "🌟", "💘", "💃", "🕺", "🎭", "🎀"];

      const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
      
      let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
      while (textEmoji === reactionEmoji) {
        textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
      }

      await m.React(textEmoji);

      const end = new Date().getTime();
      const responseTime = (end - start) / 1000;
      const pickupQuality = responseTime < 0.5 ? "🔥 SMOOTH RIZZ 🎀" :
                            responseTime < 1.0 ? "✨ PERFECT RIZZ 🎀" :
                            responseTime < 1.5 ? "🎯 GOOD RIZZ 🎀" :
                            responseTime < 2.0 ? "💘 AVERAGE RIZZ 🎀" : "😏 STABLE RIZZ 🎀";

      const text = `📦 *PICKUP LINE GENERATOR* 📦\n━━━━━━━━━━━━━━━━━\n🕰️ *Date & Time:* ${dateTime}\n🎀 ${pickupQuality} 🎀: ${responseTime.toFixed(2)}s ${reactionEmoji}\n💬 *Pickup Line:* ${pickupLine}\n━━━━━━━━━━━━━━━━━`;

      await Matrix.sendMessage(m.from, {
        text,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363419090892208@newsletter",
            newsletterName: "EF-PRIME",
            serverMessageId: 143
          }
        }
      }, { quoted: m });

    } catch (error) {
      console.error("Error fetching pickup line:", error);
      await Matrix.sendMessage(m.from, { text: "⚠️ Failed to get a pickup line, try again later! 🎀" }, { quoted: m });
    }
  }
};

export default pickup;

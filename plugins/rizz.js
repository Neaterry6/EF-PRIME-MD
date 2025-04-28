import axios from "axios";
import config from "../config.cjs";

const rizz = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

  if (cmd === "rizz") {
    try {
      const start = new Date().getTime();

      // Select a random reaction emoji 🎀
      const reactionEmojis = ["🔥", "😍", "😏", "💖", "💘", "😉", "🎀"];
      const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];

      await m.React(reactionEmoji); // React first 🎀

      // Fetch a random Rizz line from the API
      const response = await axios.get("https://pinkupline-api.onrender.com/random");
      const rizzLine = response.data.line;

      const end = new Date().getTime();
      const responseTime = (end - start) / 1000;
      
      const text = `🎀 *RIZZ DROP INCOMING!* 🎀\n━━━━━━━━━━━━━━━━━\n💫 *Rizz Quality:* 🔥🔥 PRIME RIZZ \n🕰️ *Response Time:* ${responseTime.toFixed(2)}s\n💬 *Rizz:* ${rizzLine}\n━━━━━━━━━━━━━━━━━`;

      await Matrix.sendMessage(m.from, { text }, { quoted: m });

    } catch (error) {
      console.error("Failed to fetch Rizz:", error);
      await Matrix.sendMessage(m.from, { text: "⚠️ Failed to get a Rizz line, try again later! 🎀" }, { quoted: m });
    }
  }
};

export default rizz;

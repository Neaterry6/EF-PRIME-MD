import axios from "axios";
import config from "../config.cjs";

const rizzlineCommand = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

  if (cmd !== "rizzline") return;

  const apiUrl = "https://pinkupline-api.onrender.com/random";

  try {
    await Matrix.sendMessage(m.from, { react: { text: "🎀", key: m.key } });

    const start = Date.now();
    const response = await axios.get(apiUrl, { timeout: 12000 }); // wait up to 12 seconds
    const duration = Date.now() - start;

    if (!response.data.line) {
      throw new Error("No line received.");
    }

    await Matrix.sendMessage(m.from, {
      text: `✨ *Rizz Pick-Up Line*\n━━━━━━━━━━━━━━━━━━━━━\n🎀 ${response.data.line}\n━━━━━━━━━━━━━━━━━━━━━\n⏳ *Response Time:* ${duration}ms`,
    }, { quoted: m });

    await Matrix.sendMessage(m.from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("Rizzline API Error:", error);
    await Matrix.sendMessage(m.from, {
      text: `❌ Couldn't fetch pick-up line.\n⏳ Maybe the API is slow — try again shortly!`
    }, { quoted: m });
  }
};

export default rizzlineCommand;

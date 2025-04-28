import axios from "axios";

const rizzCommand = async (m, Matrix) => {
  const body = m.body.toLowerCase();
  if (!body.startsWith(".rizz")) return;

  try {
    await Matrix.sendMessage(m.from, { react: { text: "🎀", key: m.key } });
    await Matrix.sendPresenceUpdate("composing", m.from);

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 4000); // 4 seconds timeout

    const res = await axios.get("https://pinkupline-api.onrender.com/random", {
      signal: controller.signal,
    });

    clearTimeout(timeout);
    await Matrix.sendPresenceUpdate("paused", m.from);

    if (res.status !== 200 || !res.data.line) {
      return await Matrix.sendMessage(m.from, {
        text: "❌ Couldn't fetch a pick-up line. Try again later.",
      }, { quoted: m });
    }

    const line = res.data.line;

    await Matrix.sendMessage(m.from, {
      text: `🎀 *Random Rizz Pick-Up Line* 🎀\n━━━━━━━━━━━━━━━━━━━━━\n✨ ${line}\n━━━━━━━━━━━━━━━━━━━━━\n🖤 *Powered by EF-PRIME*`,
    }, { quoted: m });

    await Matrix.sendMessage(m.from, { react: { text: "✅", key: m.key } });

  } catch (err) {
    console.error("Rizz Command Error:", err);
    await Matrix.sendMessage(m.from, {
      text: "❌ Request took too long or failed. Try again.",
    }, { quoted: m });
  }
};

export default rizzCommand;

import axios from "axios";

const rizzCommand = async (m, Matrix) => {
  const body = m.body.toLowerCase();
  if (!body.startsWith(".rizz")) return;

  try {
    await Matrix.sendMessage(m.from, { react: { text: "🎀", key: m.key } });

    const res = await axios.get("https://pinkupline-api.onrender.com/random");

    if (res.status !== 200 || !res.data.line) {
      return await Matrix.sendMessage(m.from, {
        text: "❌ Couldn’t fetch a rizz line. Try again later.",
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
      text: "❌ Error fetching pick-up line.",
    }, { quoted: m });
  }
};

export default rizzCommand;

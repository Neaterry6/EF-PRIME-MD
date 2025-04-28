import axios from "axios";

const rizzCommand = async (m, Matrix) => {
  await Matrix.sendMessage(m.from, { react: { text: "🎀", key: m.key } });

  const fetchRizz = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

      const res = await axios.get("https://pinkupline-api.onrender.com/random", {
        signal: controller.signal
      });

      clearTimeout(timeout);
      return res.data;
    } catch (e) {
      return null;
    }
  };

  let result = await fetchRizz();
  if (!result) result = await fetchRizz(); // retry once if first failed

  if (!result) {
    await Matrix.sendMessage(m.from, { text: "❌ Couldn’t fetch pick-up line after 2 tries." }, { quoted: m });
    await Matrix.sendMessage(m.from, { react: { text: "❌", key: m.key } });
    return;
  }

  await Matrix.sendMessage(m.from, {
    text: `🎀 *Random Rizz Pick-Up Line*\n━━━━━━━━━━━━━━━━━━━━━\n💌 ${result.line}\n━━━━━━━━━━━━━━━━━━━━━`
  }, { quoted: m });

  await Matrix.sendMessage(m.from, { react: { text: "✅", key: m.key } });
};

export default rizzCommand

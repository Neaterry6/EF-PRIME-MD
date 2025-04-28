import axios from "axios";
import config from "../config.cjs";

const gqCommand = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const query = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd !== "gq") return;

  if (!query) {
    return Matrix.sendMessage(m.from, {
      text: `❌ *Usage:* ${prefix}gq [imageUrl] | [text] | [font] | [name]\n\nExample:\n${prefix}gq https://cdn.waifu.im/7240.jpg | Stay Focused | Cursive | Titan`
    }, { quoted: m });
  }

  const parts = query.split("|").map(p => p.trim());
  const imageUrl = encodeURIComponent(parts[0] || "https://cdn.waifu.im/7240.jpg");
  const text = encodeURIComponent(parts[1] || "Stay sharp.");
  const font = encodeURIComponent(parts[2] || "Hi");
  const name = encodeURIComponent(parts[3] || "Titan");

  const apiURL = `https://kaiz-apis.gleeze.com/api/imagequote?imageUrl=${imageUrl}&text=${text}&font=${font}&name=${name}`;

  try {
    await Matrix.sendMessage(m.from, { react: { text: "🖌️", key: m.key } });

    const response = await axios.get(apiURL, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, "binary");

    await Matrix.sendMessage(m.from, {
      image: buffer,
      caption: `🎨 *Generated Quote Image!*\n━━━━━━━━━━━━━━━━━━━━━\n📸 *Image:* Provided\n📝 *Quote:* ${decodeURIComponent(text)}\n🖋️ *Font:* ${decodeURIComponent(font)}\n✍️ *Name:* ${decodeURIComponent(name)}\n━━━━━━━━━━━━━━━━━━━━━`
    }, { quoted: m });

    await Matrix.sendMessage(m.from, { react: { text: "✅", key: m.key } });

  } catch (err) {
    console.error(err);
    await Matrix.sendMessage(m.from, { text: "❌ Failed to generate quote image. Please check your inputs or try again later." }, { quoted: m });
  }
};

export default gqCommand

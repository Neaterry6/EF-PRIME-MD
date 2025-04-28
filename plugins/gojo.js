import config from "../config.cjs";

const gojo2 = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const body = m.body || "";
  const command = body.startsWith(prefix) ? body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

  if (command !== "gojo2") return;

  const mediaLinks = [
    "https://i.imgur.com/0yA9ZpW.mp4",
    "https://i.imgur.com/RKTWov0.jpeg",
    "https://i.imgur.com/vBocwop.jpeg",
    "https://i.imgur.com/tTZsRfh.jpeg",
    "https://i.imgur.com/yT69Sac.jpeg",
    "https://i.imgur.com/1qWJ1vy.jpeg",
    "https://i.imgur.com/Xc2uBRl.jpeg",
    "https://i.imgur.com/kU4R0XK.jpeg",
    "https://i.imgur.com/lDDBFYH.mp4",
    "https://i.imgur.com/hwFV9Sq.jpeg",
    "https://i.imgur.com/T48CEO6.jpeg",
    "https://i.imgur.com/W8GfqZN.jpeg",
    "https://i.imgur.com/zkApVTb.jpeg",
    "https://i.imgur.com/emUbsFl.jpeg",
    "https://i.imgur.com/WYBJMjm.jpeg",
    "https://i.imgur.com/QHQGDBj.jpeg",
    "https://i.imgur.com/vtCL7i6.jpeg",
    "https://i.imgur.com/2RDEUIR.jpeg",
    "https://i.imgur.com/AnqajiQ.jpeg",
    "https://i.imgur.com/NinTb5o.jpeg",
    "https://i.imgur.com/QgBL32P.jpeg",
    "https://i.imgur.com/gME3HeC.jpeg",
    "https://i.imgur.com/OcVyAEg.jpeg"
  ];

  try {
    // React to indicate loading
    await Matrix.sendMessage(m.from, { react: { text: "🎴", key: m.key } });

    const randomMedia = mediaLinks[Math.floor(Math.random() * mediaLinks.length)];

    if (randomMedia.endsWith(".mp4")) {
      await Matrix.sendMessage(
        m.from,
        {
          video: { url: randomMedia },
          caption: "「 🌸 *Satoru Gojo* 🌸 」",
        },
        { quoted: m }
      );
    } else {
      await Matrix.sendMessage(
        m.from,
        {
          image: { url: randomMedia },
          caption: "「 🌸 *Satoru Gojo* 🌸 」",
        },
        { quoted: m }
      );
    }

    // Success reaction
    await Matrix.sendMessage(m.from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("Gojo2 Error:", error);
    await Matrix.sendMessage(m.from, { text: "❌ *Failed to fetch Gojo media.*" }, { quoted: m });
  }
};

export default gojo2;

import config from '../config.cjs';
import axios from 'axios';
import { Readable } from 'stream';

const gojo2 = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "gojo") {
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
      "https://i.imgur.com/NinTb5o.jpeg",
      "https://i.imgur.com/QgBL32P.jpeg",
      "https://i.imgur.com/gME3HeC.jpeg",
      "https://i.imgur.com/OcVyAEg.jpeg"
    ];

    const randomMedia = mediaLinks[Math.floor(Math.random() * mediaLinks.length)];

    try {
      const { data } = await axios.get(randomMedia, { responseType: 'arraybuffer' });
      const stream = Readable.from(data);

      await Matrix.sendMessage(m.from, {
        video: randomMedia.endsWith('.mp4') ? stream : undefined,
        image: randomMedia.endsWith('.jpeg') ? stream : undefined,
        caption: '「 🌸 Satoru Gojo 」',
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true
        }
      }, { quoted: m });

    } catch (error) {
      console.error(error);
      await Matrix.sendMessage(m.from, { text: "An error occurred while fetching the media." }, { quoted: m });
    }
  }
};

export default gojo2

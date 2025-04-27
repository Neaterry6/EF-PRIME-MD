import axios from 'axios';
import config from '../config.cjs';

const vanea = async (m, Matrix) => {
  const prefix = '.Vanea';
  if (!m.body.startsWith(prefix)) return;

  const body = m.body.slice(prefix.length).trim();
  const cmd = body.split(' ')[0].toLowerCase();
  const query = body.slice(cmd.length).trim();

  await Matrix.sendMessage(m.from, { react: { text: "🎀", key: m.key } });

  try {
    if (cmd === "waifu") {
      const res = await axios.get(`https://waifu-wnk6.onrender.com/api/waifu?q=${query}`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.image }, caption: "✨ Here's your Waifu!" });
    }

    else if (cmd === "lyrics") {
      const [artist, title] = query.split('|');
      const res = await axios.get(`https://ap-c4yl.onrender.com/api/lyrics?artist=${artist}&title=${title}`);
      await Matrix.sendMessage(m.from, { text: `🎶 *${title}* by *${artist}:*\n\n${res.data.lyrics}` });
    }

    else if (cmd === "play") {
      const res = await axios.get(`https://apis.davidcyriltech.my.id/play?query=${query}`);
      const data = res.data.result;
      await Matrix.sendMessage(m.from, { text: `🎵 *${data.title}*\n📅 ${data.published}\n👁️ ${data.views}\n🕒 ${data.duration}` });
      await Matrix.sendMessage(m.from, { audio: { url: data.download_url }, mimetype: 'audio/mp4' });
    }

    else if (cmd === "quote") {
      const category = query.toLowerCase();
      const res = await axios.get(`https://ap-c4yl.onrender.com/api/quotes/${category}`);
      await Matrix.sendMessage(m.from, { text: `💬 *${res.data.quote}* — _${res.data.author}_` });
    }

    else if (cmd === "mood") {
      const res = await axios.get("https://ap-c4yl.onrender.com/api/mood");
      await Matrix.sendMessage(m.from, { text: `😌 *Mood Suggestion:* ${res.data.mood}` });
    }

    else if (cmd === "datetime") {
      const res = await axios.get("https://ap-c4yl.onrender.com/api/datetime");
      await Matrix.sendMessage(m.from, { text: `🕰️ ${res.data.datetime}` });
    }

    else if (cmd === "chat") {
      const [uid, question] = query.split('|');
      const res = await axios.post("https://ap-c4yl.onrender.com/api/chat", { uid, question });
      await Matrix.sendMessage(m.from, { text: `🤖 *AI:* ${res.data.response}` });
    }

    else if (cmd === "dl") {
      const res = await axios.get(`https://alldl-wnld.onrender.com/api/download?url=${query}`);
      await Matrix.sendMessage(m.from, { video: { url: res.data.download_url }, caption: "✅ Downloaded Video" });
    }

    else if (cmd === "flux") {
      const res = await axios.get(`https://kaiz-apis.gleeze.com/api/fluxwebui?prompt=${encodeURIComponent(query)}`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.image }, caption: `🖼️ Flux AI Image for: *${query}*` });
    }

    else if (cmd === "dog") {
      const res = await axios.get("https://dog.ceo/api/breeds/image/random");
      await Matrix.sendMessage(m.from, { image: { url: res.data.message }, caption: "🐶 Random Dog!" });
    }

    else if (cmd === "cat") {
      const res = await axios.get("https://api.thecatapi.com/v1/images/search");
      await Matrix.sendMessage(m.from, { image: { url: res.data[0].url }, caption: "🐱 Random Cat!" });
    }

    else if (cmd === "neko") {
      const res = await axios.get("https://neko-love.xyz/api/v1/neko");
      await Matrix.sendMessage(m.from, { image: { url: res.data.url }, caption: "😸 Neko pic!" });
    }

    else if (cmd === "movie") {
      const res = await axios.get(`https://ap-c4yl.onrender.com/api/movie?title=${encodeURIComponent(query)}`);
      const d = res.data;
      await Matrix.sendMessage(m.from, { text: `🎥 *${d.title}*\n⭐ ${d.rating}\n🗓️ ${d.release_date}\n\n${d.plot}` });
    }

    else if (cmd === "music") {
      const res = await axios.get(`https://ap-c4yl.onrender.com/api/music?title=${encodeURIComponent(query)}`);
      const d = res.data;
      await Matrix.sendMessage(m.from, { text: `🎶 *${d.title}* by *${d.artist}*\n📅 ${d.release_date}\n💽 Album: ${d.album}` });
    }

    else if (cmd === "translate") {
      const [text, lang] = query.split('|');
      const res = await axios.get(`https://ap-c4yl.onrender.com/api/translate?text=${encodeURIComponent(text)}&lang=${lang}`);
      await Matrix.sendMessage(m.from, { text: `🌐 *Translation to ${lang}:* ${res.data.translated}` });
    }

    else if (cmd === "anime") {
      const res = await axios.get(`https://ap-c4yl.onrender.com/api/anime?title=${encodeURIComponent(query)}`);
      const d = res.data;
      await Matrix.sendMessage(m.from, { text: `🎌 *${d.title}*\n🗓️ ${d.release_date}\n🎥 Episodes: ${d.episodes}\n⭐ ${d.rating}\n\n${d.synopsis}` });
    }

  } catch (e) {
    await Matrix.sendMessage(m.from, { text: "⚠️ Error fetching data — try again!" });
    console.log(e);
  }
};

export default vanea;

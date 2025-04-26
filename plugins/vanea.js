import axios from 'axios';
import config from '../config.cjs';

const vanea = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const query = m.body.slice(prefix.length + cmd.length).trim();

  if (!cmd) return;

  await Matrix.sendMessage(m.from, { react: { text: "🤖", key: m.key } });

  // Waifu Image
  if (cmd === "waifu") {
    const waifuRes = await axios.get(`https://waifu-wnk6.onrender.com/api/waifu?q=${query}`);
    await Matrix.sendMessage(m.from, { image: { url: waifuRes.data.image }, caption: "✨ Here’s your Waifu! ✨" }, { quoted: m });
  }

  // Music Info & Preview
  else if (cmd === "music") {
    const musicRes = await axios.get(`https://music-movie-search-api.onrender.com/api/music?q=${query}`);
    const musicData = musicRes.data;
    const text = `🎶 *Music Info* 🎶\n🎵 *Title:* ${musicData.title}\n🎤 *Artist:* ${musicData.artist}\n📀 *Album:* ${musicData.album}\n⏳ *Duration:* ${musicData.duration}`;
    await Matrix.sendMessage(m.from, { text }, { quoted: m });
    await Matrix.sendMessage(m.from, { audio: { url: musicData.preview }, mimetype: 'audio/mp3' });
  }

  // Movie Info
  else if (cmd === "movie") {
    const movieRes = await axios.get(`https://music-movie-search-api.onrender.com/api/movie?q=${query}`);
    const data = movieRes.data;
    const text = `🎬 *Movie Info* 🎬\n🎥 *Title:* ${data.title}\n📆 *Year:* ${data.year}\n⭐ *Rating:* ${data.rating}\n📝 *Overview:* ${data.overview}`;
    await Matrix.sendMessage(m.from, { text }, { quoted: m });
    await Matrix.sendMessage(m.from, { image: { url: data.poster }, caption: "🎞️ Movie Poster 🎞️" });
  }

  // Pexels Image
  else if (cmd === "pexels") {
    const pexelsRes = await axios.get(`https://pexel-api-ery7.onrender.com/api/pexels?q=${query}`);
    const images = pexelsRes.data.images;
    const img = images[Math.floor(Math.random() * images.length)];
    await Matrix.sendMessage(m.from, { image: { url: img }, caption: "📸 Here's your image!" });
  }

  // Translate
  else if (cmd === "translate") {
    const [text, from, to] = query.split('|');
    const transRes = await axios.post("https://translator-api-bhew.onrender.com/api/translate", {
      text, sourceLang: from, targetLang: to
    });
    await Matrix.sendMessage(m.from, { text: `🌍 *Translation:*\n💬 *Original:* ${text}\n🔤 *Translated:* ${transRes.data.translation}` });
  }

  // Anime Info
  else if (cmd === "anime") {
    const animeRes = await axios.get(`https://anime-api-js7o.onrender.com/api/anime?query=${query}`);
    const data = animeRes.data.data[0];
    const text = `🎌 *Anime Info* 🎌\n📺 *Title:* ${data.title}\n📖 *Synopsis:* ${data.synopsis}\n🎭 *Genres:* ${data.genres.join(", ")}\n⭐ *Score:* ${data.score}\n📺 *Episodes:* ${data.episodes}`;
    await Matrix.sendMessage(m.from, { text }, { quoted: m });
    await Matrix.sendMessage(m.from, { image: { url: data.image }, caption: "🎨 Anime Cover 🎨" });
  }

  // Neko Image
  else if (cmd === "neko") {
    const nekoRes = await axios.get("https://nekos.life/api/v2/img/neko");
    await Matrix.sendMessage(m.from, { image: { url: nekoRes.data.url }, caption: "🐱 Here’s a cute Neko!" });
  }

  // Random Dog
  else if (cmd === "dog") {
    const dogRes = await axios.get("https://dog.ceo/api/breeds/image/random");
    await Matrix.sendMessage(m.from, { image: { url: dogRes.data.message }, caption: "🐶 Here’s a dog!" });
  }

  // Random Cat
  else if (cmd === "cat") {
    const catRes = await axios.get("https://api.thecatapi.com/v1/images/search");
    await Matrix.sendMessage(m.from, { image: { url: catRes.data[0].url }, caption: "🐱 Here’s a cat!" });
  }

  // Lyrics Fetch
  else if (cmd === "lyrics") {
    const [artist, title] = query.split('|');
    const lyricsRes = await axios.get(`https://ap-c4yl.onrender.com/api/lyrics?artist=${artist}&title=${title}`);
    await Matrix.sendMessage(m.from, { text: `🎶 *Lyrics for ${title} by ${artist}:*\n\n${lyricsRes.data.lyrics}` });
  }

  // Datetime
  else if (cmd === "datetime") {
    const dateRes = await axios.get("https://ap-c4yl.onrender.com/api/datetime");
    await Matrix.sendMessage(m.from, { text: `🕰️ *Date & Time:* ${dateRes.data.datetime}` });
  }

  // Quotes
  else if (cmd === "quote") {
    const quoteRes = await axios.get("https://ap-c4yl.onrender.com/api/quotes/random");
    await Matrix.sendMessage(m.from, { text: `💬 *Quote:*\n"${quoteRes.data.quote}"\n- ${quoteRes.data.author}` });
  }

  // Mood
  else if (cmd === "mood") {
    const moodRes = await axios.get("https://ap-c4yl.onrender.com/api/mood");
    await Matrix.sendMessage(m.from, { text: `🌀 *Mood Content:* ${moodRes.data.result}` });
  }

  // Flux Image Gen
  else if (cmd === "flux") {
    const fluxRes = await axios.post("https://ap-c4yl.onrender.com/api/flux", { prompt: query });
    await Matrix.sendMessage(m.from, { image: { url: fluxRes.data.image }, caption: "🎨 Flux Art" });
  }

  // AI Chat
  else if (cmd === "chat") {
    const [uid, question] = query.split('|');
    if (!uid || !question) return await Matrix.sendMessage(m.from, { text: `❌ Usage: ${config.PREFIX}chat UID|Your question` }, { quoted: m });
    const chatRes = await axios.post("https://ap-c4yl.onrender.com/api/chat", { uid, question });
    await Matrix.sendMessage(m.from, { text: `💬 *AI Response:*\n${chatRes.data.response}` }, { quoted: m });
  }

  // YouTube Play & Download
  else if (cmd === "play") {
    const playRes = await axios.get(`https://apis.davidcyriltech.my.id/play?query=${query}`);
    const result = playRes.data.result;
    const caption = `🎶 *${result.title}*\n⏳ *Duration:* ${result.duration}\n👁️ *Views:* ${result.views}\n📅 *Published:* ${result.published}`;
    await Matrix.sendMessage(m.from, { image: { url: result.thumbnail }, caption }, { quoted: m });
    await Matrix.sendMessage(m.from, { audio: { url: result.download_url }, mimetype: 'audio/mp4' }, { quoted: m });
  }

  // Video Downloader
  else if (cmd === "dl") {
    const dlRes = await axios.get(`https://alldl-wnld.onrender.com/api/download?url=${encodeURIComponent(query)}`);
    await Matrix.sendMessage(m.from, { video: { url: dlRes.data.result }, caption: "📥 Downloaded Video!" }, { quoted: m });
  }

  // Invalid command fallback
  else {
    await Matrix.sendMessage(m.from, { text: `❌ Unknown command.\n✅ Available: waifu, music, movie, pexels, translate, anime, neko, dog, cat, lyrics, datetime, quote, mood, flux, chat, play, dl.` });
  }
};

export default vanea;

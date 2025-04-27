import axios from 'axios';

// Helper to extract message content
const getMessageText = (m) => {
  return (
    m.message?.conversation ||
    m.message?.extendedTextMessage?.text ||
    m.message?.imageMessage?.caption ||
    m.message?.videoMessage?.caption ||
    ''
  );
};

const p = async (m, Matrix) => {
  const prefix = '.p';
  const body = getMessageText(m);
  if (!body.startsWith(prefix)) return;

  const query = body.slice(prefix.length).trim();
  if (!query) {
    return await Matrix.sendMessage(m.from, {
      text: `╭━━━〔 🎀 *P Command Guide* 🎀 〕━━━⊰  
┃ 🔹 *Send Waifu:* \`.p send waifu <type>\`
┃ 🔹 *Send Cat:* \`.p send cat\`
┃ 🔹 *Send Dog:* \`.p send dog\`
┃ 🔹 *Send Neko:* \`.p send neko\`
┃ 🔹 *Search Pexel:* \`.p send pexel <keyword>\`
┃ 🔹 *Download Song:* \`.p send song <song name>\`
┃ 🔹 *Search Movie:* \`.p send movie <title>\`
┃ 🔹 *Search Anime:* \`.p send anime <title>\`
┃ 🔹 *Search Lyrics:* \`.p send lyrics <artist>|<title>\`
┃ 🔹 *Fetch Date & Time:* \`.p datetime\`
┃ 🔹 *Generate Image:* \`.p generate <prompt>|<ratio>\`
┃ 🔹 *Translate:* \`.p translate <text>|<from>|<to>\`
┃ 🔹 *Get Rizz Line:* \`.p send rizz\`
┃ 🔹 *Download Video:* \`.p dl <link>\`
╰━━━━━━━━━━━━━━━━━━━━━━⊱`
    }, { quoted: m });
  }

  const lowerQuery = query.toLowerCase();

  try {
    if (lowerQuery.startsWith('send anime')) {
      const animeTitle = query.slice(11).trim();
      if (!animeTitle) return Matrix.sendMessage(m.from, { text: "❌ Provide an anime title." }, { quoted: m });
      const res = await axios.get(`https://anime-api-js7o.onrender.com/api/anime?query=${encodeURIComponent(animeTitle)}`);
      const anime = res.data.data[0];
      await Matrix.sendMessage(m.from, {
        image: { url: anime.cover || 'https://i.imgur.com/U3YqK5s.png' },
        caption: `📺 *Title:* ${anime.title}\n📖 *Synopsis:* ${anime.synopsis}\n🏷️ *Genres:* ${anime.genres.join(", ")}\n⭐ *Score:* ${anime.score}\n🎥 *Episodes:* ${anime.episodes}`
      }, { quoted: m });

    } else if (lowerQuery.startsWith('send waifu')) {
      const type = query.slice(11).trim() || "waifu";
      const res = await axios.get(`https://waifu-wnk6.onrender.com/api/waifu?q=${encodeURIComponent(type)}`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.image }, caption: `✨ *Random ${type} Waifu!*` }, { quoted: m });

    } else if (lowerQuery.startsWith('send cat')) {
      const res = await axios.get(`https://api.thecatapi.com/v1/images/search`);
      await Matrix.sendMessage(m.from, { image: { url: res.data[0].url }, caption: `🐱 *Random Cat!*` }, { quoted: m });

    } else if (lowerQuery.startsWith('send dog')) {
      const res = await axios.get(`https://dog.ceo/api/breeds/image/random`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.message }, caption: `🐶 *Random Dog!*` }, { quoted: m });

    } else if (lowerQuery.startsWith('send neko')) {
      const res = await axios.get(`https://nekos.life/api/v2/img/neko`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.url }, caption: `😸 *Random Neko!*` }, { quoted: m });

    } else if (lowerQuery.startsWith('send pexel')) {
      const search = query.slice(11).trim();
      if (!search) return Matrix.sendMessage(m.from, { text: "❌ Provide a keyword for Pexels." }, { quoted: m });
      const res = await axios.get(`https://pexel-api-ery7.onrender.com/api/pexels?q=${encodeURIComponent(search)}`);
      const randomImage = res.data.urls[Math.floor(Math.random() * res.data.urls.length)];
      await Matrix.sendMessage(m.from, { image: { url: randomImage }, caption: `✨ *Pexels Result for "${search}"*` }, { quoted: m });

    } else if (lowerQuery.startsWith('send song')) {
      const songName = query.slice(10).trim();
      if (!songName) return Matrix.sendMessage(m.from, { text: "❌ Provide a song name." }, { quoted: m });
      const res = await axios.get(`https://music-movie-search-api.onrender.com/api/music?q=${encodeURIComponent(songName)}`);
      await Matrix.sendMessage(m.from, {
        audio: { url: res.data.preview },
        mimetype: 'audio/mpeg',
        caption: `🎵 *${res.data.title} - ${res.data.artist}*\n🎼 *Album:* ${res.data.album}`
      }, { quoted: m });

    } else if (lowerQuery.startsWith('send movie')) {
      const movieName = query.slice(11).trim();
      if (!movieName) return Matrix.sendMessage(m.from, { text: "❌ Provide a movie title." }, { quoted: m });
      const res = await axios.get(`https://music-movie-search-api.onrender.com/api/movie?q=${encodeURIComponent(movieName)}`);
      await Matrix.sendMessage(m.from, {
        image: { url: res.data.poster },
        caption: `🎬 *${res.data.title}*\n📅 *Year:* ${res.data.year}\n⭐ *Rating:* ${res.data.rating}`
      }, { quoted: m });

    } else if (lowerQuery.startsWith('send lyrics')) {
      const parts = query.slice(11).split("|");
      if (parts.length < 2) return Matrix.sendMessage(m.from, { text: "❌ Format: .p send lyrics Artist|Title" }, { quoted: m });
      const [artist, title] = parts.map(v => v.trim());
      const res = await axios.get(`https://ap-c4yl.onrender.com/api/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`);
      await Matrix.sendMessage(m.from, { text: `🎤 *Lyrics for ${title} by ${artist}:*\n\n${res.data.lyrics}` }, { quoted: m });

    } else if (lowerQuery.startsWith('datetime')) {
      const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });
      await Matrix.sendMessage(m.from, { text: `⏳ *Current Date & Time:* ${now}` }, { quoted: m });

    } else if (lowerQuery.startsWith('translate')) {
      const parts = query.slice(9).split("|");
      if (parts.length < 3) return Matrix.sendMessage(m.from, { text: "❌ Format: .p translate text|from|to" }, { quoted: m });
      const [text, from, to] = parts.map(v => v.trim());
      const res = await axios.post("https://translator-api-bhew.onrender.com/api/translate", { text, sourceLang: from, targetLang: to });
      await Matrix.sendMessage(m.from, { text: `🌍 *Translation:* ${res.data.translatedText}` }, { quoted: m });

    } else if (lowerQuery.startsWith('generate')) {
      const parts = query.slice(8).split("|");
      if (parts.length < 2) return Matrix.sendMessage(m.from, { text: "❌ Format: .p generate prompt|ratio" }, { quoted: m });
      const [prompt, ratio] = parts.map(v => v.trim());
      const res = await axios.get(`https://kaiz-apis.gleeze.com/api/fluxwebui?prompt=${encodeURIComponent(prompt)}&ratio=${encodeURIComponent(ratio)}`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.image }, caption: `🎨 *AI Artwork Generated!*\n\n🖌️ Prompt: ${prompt}\n📐 Ratio: ${ratio}` }, { quoted: m });

    } else if (lowerQuery.startsWith('send rizz')) {
      const res = await axios.get(`https://pinkupline-api.onrender.com/random`);
      const pickupLine = res.data.line || res.data.pickupLine || "No pickup line found.";
      await Matrix.sendMessage(m.from, {
        text: `╭━━━〔 🎩 *𝗥𝗜𝗭𝗭 𝗠𝗔𝗦𝗧𝗘𝗥* 🎩 〕━━━⊰  
┃ 💘✨ *Legendary Pickup Line:*  
┃ “${pickupLine}”  
┃  
┃ 🔥 *Drop this and let the magic unfold!*  
╰━━━━━━━━━━━━━━━━━━━━━━⊱`
      }, { quoted: m });

    } else if (lowerQuery.startsWith('dl ')) {
      const url = query.slice(3).trim();
      const res = await axios.get(`https://alldl-wnld.onrender.com/api/download?url=${encodeURIComponent(url)}`);
      await Matrix.sendMessage(m.from, {
        video: { url: res.data.video },
        mimetype: 'video/mp4',
        caption: `🎬 *Your downloaded video*`
      }, { quoted: m });

    } else {
      await Matrix.sendMessage(m.from, { text: "❌ Unknown command. Type `.p` for available commands." }, { quoted: m });
    }

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    await Matrix.sendMessage(m.from, { text: `❌ *Something went wrong:* ${err.message}` }, { quoted: m });
  }
};

export default p;

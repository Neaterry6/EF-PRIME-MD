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
┃ 🔹 *Search Anime:* \`.p anime <title>\`
┃ 🔹 *Search Lyrics:* \`.p send lyrics <artist>|<title>\`
┃ 🔹 *Fetch Date & Time:* \`.p datetime\`
┃ 🔹 *Generate Image:* \`.p generate <prompt>|<ratio>\`
┃ 🔹 *Translate:* \`.p translate <text>|<from>|<to>\`
┃ 🔹 *Get Rizz Line:* \`.p rizz\`
┃ 🔹 *Download Video:* \`.p dl <link>\`
╰━━━━━━━━━━━━━━━━━━━━━━⊱`
    }, { quoted: m });
  }

  const lowerQuery = query.toLowerCase();

  try {
    // Anime Search
    if (lowerQuery.startsWith('anime')) {
      const animeName = query.slice(5).trim();
      if (!animeName) return await Matrix.sendMessage(m.from, { text: "❌ *Provide an anime name.*" }, { quoted: m });

      const res = await axios.get(`https://anime-api-js7o.onrender.com/api/anime?query=${encodeURIComponent(animeName)}`);
      if (!res.data?.data?.length) throw new Error("No anime found.");

      const anime = res.data.data[0];
      await Matrix.sendMessage(m.from, {
        image: { url: anime.images.jpg.large_image_url },
        caption: `🎌 *Anime Search Result*\n━━━━━━━━━━━━━━━━━━━━━\n🎞️ *Title:* ${anime.title}\n📖 *Type:* ${anime.type}\n🎬 *Episodes:* ${anime.episodes}\n📆 *Aired:* ${anime.aired.from.split('T')[0]}\n🔗 *Link:* ${anime.url}\n━━━━━━━━━━━━━━━━━━━━━`
      }, { quoted: m });
    }

    // Rizz Pickup Line
else if (lowerQuery.startsWith('rizz')) {
  try {
    const response = await axios.get('https://pinkupline-api.onrender.com/random');

    if (!response.data || !response.data.line) {
      await Matrix.sendMessage(m.from, { text: '❌ Could not fetch a pick-up line right now.' }, { quoted: m });
      return;
    }

    await Matrix.sendMessage(m.from, {
      text: `✨ *Random Rizz Pick-Up Line*\n━━━━━━━━━━━━━━━━━━━━━\n📝 ${response.data.line}\n━━━━━━━━━━━━━━━━━━━━━`
    }, { quoted: m });

  } catch (error) {
    console.error('[RIZZ ERROR]:', error);
    await Matrix.sendMessage(m.from, { text: '❌ An error occurred while fetching a pick-up line.' }, { quoted: m });
  }
}

    // Send Waifu
    else if (lowerQuery.startsWith('send waifu')) {
      const type = query.slice(11).trim() || 'cute';
      const res = await axios.get(`https://waifu-wnk6.onrender.com/api/waifu?q=${encodeURIComponent(type)}`);
      await Matrix.sendMessage(m.from, {
        image: { url: res.data.image },
        caption: `🎀 *Waifu Generator Result*\n━━━━━━━━━━━━━━━━━━━━━\n🖼️ *Image URL:* ${res.data.image}\n🏷️ *Tags:* ${res.data.tags.join(', ')}\n📏 *Height:* ${res.data.height}\n━━━━━━━━━━━━━━━━━━━━━`
      }, { quoted: m });
    }

    // Send Cat
    else if (lowerQuery.startsWith('send cat')) {
      const res = await axios.get(`https://api.thecatapi.com/v1/images/search`);
      await Matrix.sendMessage(m.from, { image: { url: res.data[0].url }, caption: `🐱 *Random Cat!*` }, { quoted: m });
    }

    // Send Dog
    else if (lowerQuery.startsWith('send dog')) {
      const res = await axios.get(`https://dog.ceo/api/breeds/image/random`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.message }, caption: `🐶 *Random Dog!*` }, { quoted: m });
    }

    // Send Neko
    else if (lowerQuery.startsWith('send neko')) {
      const res = await axios.get(`https://nekos.life/api/v2/img/neko`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.url }, caption: `😸 *Random Neko!*` }, { quoted: m });
    }

    // Send Pexel
    else if (lowerQuery.startsWith('send pexel')) {
      const search = query.replace(/send pexel/i, '').trim();
      if (!search) return Matrix.sendMessage(m.from, { text: "❌ Provide a keyword for Pexels." }, { quoted: m });
      const res = await axios.get(`https://pexel-api-ery7.onrender.com/api/pexels?q=${encodeURIComponent(search)}`);
      const results = res.data?.results;
      if (!results?.length) return Matrix.sendMessage(m.from, { text: `❌ No images found for *${search}*.` }, { quoted: m });
      const randomImage = results[Math.floor(Math.random() * results.length)].url;
      await Matrix.sendMessage(m.from, { image: { url: randomImage }, caption: `✨ *Pexels Result for "${search}"*` }, { quoted: m });
    }

    // Send Song
    else if (lowerQuery.startsWith('send song')) {
      const songName = query.slice(10).trim();
      if (!songName) return await Matrix.sendMessage(m.from, { text: "❌ *Provide a song name.*" }, { quoted: m });
      const res = await axios.get(`https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(songName)}`);
      const song = res.data.result;
      await Matrix.sendMessage(m.from, {
        image: { url: song.thumbnail },
        caption: `🎶 *Song Details*\n━━━━━━━━━━━━━━━━━━━━━\n📀 *Title:* ${song.title}\n⏳ *Duration:* ${song.duration}\n👁️ *Views:* ${song.views.toLocaleString()}\n📅 *Published:* ${song.published}\n🔗 *YouTube:* [Click Here](${song.video_url})\n━━━━━━━━━━━━━━━━━━━━━`
      }, { quoted: m });
      await Matrix.sendMessage(m.from, {
        audio: { url: song.download_url },
        mimetype: 'audio/mpeg',
        caption: `🎧 *Here's your downloaded song: ${song.title}*`
      }, { quoted: m });
    }

    // Send Lyrics
    else if (lowerQuery.startsWith('send lyrics')) {
      const parts = query.slice(11).split("|");
      if (parts.length < 2) return Matrix.sendMessage(m.from, { text: "❌ Format: .p send lyrics Artist|Title" }, { quoted: m });
      const [artist, title] = parts.map(v => v.trim());
      const res = await axios.get(`https://ap-c4yl.onrender.com/api/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`);
      await Matrix.sendMessage(m.from, { text: `🎤 *Lyrics for ${title} by ${artist}:*\n\n${res.data.lyrics}` }, { quoted: m });
    }

    // DateTime
    else if (lowerQuery.startsWith('datetime')) {
      const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });
      await Matrix.sendMessage(m.from, { text: `⏳ *Current Date & Time:* ${now}` }, { quoted: m });
    }

    // Translate
    else if (lowerQuery.startsWith('translate')) {
      const parts = query.slice(9).split("|");
      if (parts.length < 3) return Matrix.sendMessage(m.from, { text: "❌ Format: .p translate text|from|to" }, { quoted: m });
      const [text, from, to] = parts.map(v => v.trim());
      const res = await axios.post("https://translator-api-bhew.onrender.com/api/translate", { text, sourceLang: from, targetLang: to });
      await Matrix.sendMessage(m.from, { text: `🌍 *Translation:* ${res.data.translatedText}` }, { quoted: m });
    }
// AI Image Generate
else if (lowerQuery.startsWith('generate')) {
  const promptText = query.slice(8).trim();
  if (!promptText) return Matrix.sendMessage(m.from, { text: "❌ Provide a prompt to generate an image.\n\n*Example:* .p generate Cute anime girl" }, { quoted: m });

  try {
    const response = await axios.get(`https://kaiz-apis.gleeze.com/api/flux?prompt=${encodeURIComponent(promptText)}`, {
      responseType: 'arraybuffer'
    });

    const imageBuffer = Buffer.from(response.data, 'binary');

    await Matrix.sendMessage(m.from, {
      image: imageBuffer,
      caption: `🖼️ *Flux AI Generated Image*\n━━━━━━━━━━━━━━━━━━━━━\n🎨 *Prompt:* ${promptText}`
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    await Matrix.sendMessage(m.from, { text: `❌ Error generating image: ${err.message}` }, { quoted: m });
  }
}
 
 // Video Download
else if (lowerQuery.startsWith('dl')) {
  const link = query.slice(2).trim();
  if (!link) {
    return Matrix.sendMessage(m.from, { text: "❌ Provide a video link." }, { quoted: m });
  }

  const start = Date.now();
  const apiRes = await axios.get(`https://bk9.fun/download/alldownload?url=${encodeURIComponent(link)}`);
  const timeTaken = Date.now() - start;

  if (!apiRes.data.status) {
    return Matrix.sendMessage(m.from, { text: `❌ Failed to fetch video.` }, { quoted: m });
  }

  const { title, low, high } = apiRes.data.BK9;

  const resultText = `
🎯 *API RESPONSE* 🎯
━━━━━━━━━━━━━━━━━━━━━
🔗 *URL:* ${link}
✅ *Status:* 200 OK
⏳ *Time Taken:* ${timeTaken}ms
📜 *Video Info:*
🎬 *Title:* ${title}
📥 *Low Quality:* ${low}
📥 *High Quality:* ${high}
━━━━━━━━━━━━━━━━━━━━━
  `;

  await Matrix.sendMessage(m.from, { text: resultText.trim() }, { quoted: m });

  // Optional: auto-send the high quality video file directly if you want  
  await Matrix.sendMessage(m.from, {
    video: { url: high },
    caption: `🎥 *Downloaded Video:*\n📀 *Title:* ${title}`
  }, { quoted: m });
}

    // Fallback AI Response
    else {
      const aiRes = await axios.get(`https://kaiz-apis.gleeze.com/api/deepseek-v3?ask=${encodeURIComponent(query)}`);
      await Matrix.sendMessage(m.from, {
        text: `🎀 *DeepSeek AI Response*\n━━━━━━━━━━━━━━━━━━━━━\n🤖 ${aiRes.data.response}\n━━━━━━━━━━━━━━━━━━━━━`
      }, { quoted: m });
    }

  } catch (e) {
    console.error(e);
    await Matrix.sendMessage(m.from, { text: `❌ Error: ${e.message}` }, { quoted: m });
  }
}; 

export default p;

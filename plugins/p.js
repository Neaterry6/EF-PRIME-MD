import axios from 'axios';

const p = async (m, Matrix) => {
  const prefix = '.p';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;
  
  if (!body || !body.startsWith(prefix)) return;

  const query = body.slice(prefix.length).trim();
  if (!query) {
    return await Matrix.sendMessage(m.from, { text: "❌ *Please provide a query after .p*" }, { quoted: m });
  }

  const lowerQuery = query.toLowerCase();

  try {
    if (lowerQuery.startsWith('send waifu')) {
      const res = await axios.get(`https://waifu-wnk6.onrender.com/api/waifu`);
      console.log("Waifu API Response:", res.data);
      if (!res.data || !res.data.url) throw new Error("Waifu API returned undefined data");

      await Matrix.sendMessage(m.from, { image: { url: res.data.url }, caption: `✨ *Random Waifu for you!*` }, { quoted: m });

    } else if (lowerQuery.startsWith('generate')) {
      const prompt = query.slice(9).trim();
      if (!prompt) return await Matrix.sendMessage(m.from, { text: "❌ *Provide a prompt to generate.*" }, { quoted: m });

      const res = await axios.get(`https://kaiz-apis.gleeze.com/api/fluxwebui?prompt=${encodeURIComponent(prompt)}`);
      console.log("Image Generation API Response:", res.data);
      if (!res.data || !res.data.output) throw new Error("Image generation failed");

      await Matrix.sendMessage(m.from, { image: { url: res.data.output }, caption: `✨ *Generated Image*` }, { quoted: m });

    } else if (lowerQuery.startsWith('send pexel')) {
      const search = query.slice(11).trim();
      if (!search) return await Matrix.sendMessage(m.from, { text: "❌ *Provide a keyword to search Pexel images.*" }, { quoted: m });

      const res = await axios.get(`https://pexel-api-ery7.onrender.com/api/pexels?q=${encodeURIComponent(search)}`);
      console.log("Pexel API Response:", res.data);
      if (!res.data || !res.data.urls || res.data.urls.length === 0) throw new Error("No Pexel images found");

      await Matrix.sendMessage(m.from, { image: { url: res.data.urls[0] }, caption: `✨ *Pexel Result for "${search}"*` }, { quoted: m });

    } else if (lowerQuery.startsWith('send song')) {
      const songName = query.slice(10).trim();
      if (!songName) return await Matrix.sendMessage(m.from, { text: "❌ *Please provide a song name to search.*" }, { quoted: m });

      const res = await axios.get(`https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(songName)}`);
      console.log("Song API Response:", res.data);

      if (!res.data || !res.data.result || !res.data.result.download_url) throw new Error("Song API returned undefined link");

      const songDetails = res.data.result;
      await Matrix.sendMessage(m.from, {
        image: { url: songDetails.thumbnail },
        caption: `
🎵 *Song Details*  
📀 *Title:* ${songDetails.title}  
⏳ *Duration:* ${songDetails.duration}  
👀 *Views:* ${songDetails.views.toLocaleString()}  
📅 *Published:* ${songDetails.published}  
🔗 *YouTube Link:* [Click Here](${songDetails.video_url})
      `}, { quoted: m });

      await Matrix.sendMessage(m.from, {
        audio: { url: songDetails.download_url },
        mimetype: 'audio/mpeg',
        caption: `🎵 *Here’s your downloaded song:* ${songDetails.title}`
      }, { quoted: m });

    } else {
      const res = await axios.get(`https://kaiz-apis.gleeze.com/api/deepseek-v3?ask=${encodeURIComponent(query)}`);
      console.log("DeepSeek API Response:", res.data);
      if (!res.data || !res.data.response) throw new Error("DeepSeek AI returned undefined response");

      await Matrix.sendMessage(m.from, { text: `🤖 *DeepSeek AI says:*\n${res.data.response}` }, { quoted: m });
    }

  } catch (err) {
    console.error("Error in .p command:", err.response?.data || err.message);
    await Matrix.sendMessage(m.from, { text: `❌ *Something went wrong. Error: ${err.message}*` }, { quoted: m });
  }
};

export default p;

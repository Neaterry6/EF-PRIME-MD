import axios from 'axios';

const p = async (m, Matrix) => {
  const prefix = '.p';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;
  if (!body || !body.startsWith(prefix)) return;

  const query = body.slice(prefix.length).trim();

  if (!query) {
    await Matrix.sendMessage(m.from, { text: "❌ *Please provide a query after .p*" }, { quoted: m });
    return;
  }

  const lowerQuery = query.toLowerCase();

  try {
    if (lowerQuery.startsWith('send waifu')) {
      const res = await axios.get(`https://waifu-wnk6.onrender.com/api/waifu`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.url }, caption: `✨ *Random Waifu for you!*` }, { quoted: m });

    } else if (lowerQuery.startsWith('generate')) {
      const prompt = query.slice(9).trim();
      if (!prompt) return await Matrix.sendMessage(m.from, { text: "❌ *Provide a prompt to generate.*" }, { quoted: m });
      const res = await axios.get(`https://kaiz-apis.gleeze.com/api/fluxwebui?prompt=${encodeURIComponent(prompt)}`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.output }, caption: `✨ *Generated Image*` }, { quoted: m });

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
      if (!search) return await Matrix.sendMessage(m.from, { text: "❌ *Provide a keyword to search Pexel images.*" }, { quoted: m });
      const res = await axios.get(`https://pexel-api-ery7.onrender.com/api/pexels?q=${encodeURIComponent(search)}`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.url }, caption: `✨ *Pexel Result for "${search}"*` }, { quoted: m });

    } else if (lowerQuery.startsWith('send song')) {
      const songName = query.slice(10).trim();
      if (!songName) return await Matrix.sendMessage(m.from, { text: "❌ *Please provide a song name to search.*" }, { quoted: m });
      const res = await axios.get(`https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(songName)}`);
      await Matrix.sendMessage(m.from, { audio: { url: res.data.url }, mimetype: 'audio/mpeg' }, { quoted: m });

    } else {
      const res = await axios.get(`https://kaiz-apis.gleeze.com/api/deepseek-v3?ask=${encodeURIComponent(query)}`);
      await Matrix.sendMessage(m.from, { text: `🤖 *DeepSeek AI says:*\n${res.data.result}` }, { quoted: m });
    }

  } catch (err) {
    console.error("Error in .p command:", err.message || err);
    await Matrix.sendMessage(m.from, { text: `❌ *Something went wrong. Try again later.*` }, { quoted: m });
  }
};

export default p;

import axios from 'axios';
import config from '../config.cjs';

const vanea = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const body = m.body || '';
  const cmd = body.startsWith(prefix) ? body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = body.slice(prefix.length + cmd.length).trim().split(' ');
  const text = args.join(' ');

  if (cmd !== 'vanea') return;

  const subcmd = args[0]?.toLowerCase();

  if (!subcmd) {
    return await Matrix.sendMessage(m.from, { text: `*Usage Examples:*
.vanea chat Hello AI
.vanea quote wisdom
.vanea mood
.vanea anime Naruto
.vanea waifu maid
.vanea roast savage
.vanea music Eminem
.vanea movie Inception
.vanea neko
.vanea dog
.vanea cat` }, { quoted: m });
  }

  await Matrix.sendMessage(m.from, { react: { text: "🔍", key: m.key } });

  try {
    let apiUrl = '';
    let response;

    switch (subcmd) {
      case 'chat':
        if (!args[1]) return m.reply('Provide a message to chat.');
        apiUrl = `https://ap-c4yl.onrender.com/api/chat/ask?uid=${m.sender}&query=${encodeURIComponent(args.slice(1).join(' '))}`;
        response = await axios.get(apiUrl);
        return m.reply(response.data.reply);

      case 'quote':
        if (!args[1]) return m.reply('Provide a quote category (success, motivational, wisdom).');
        apiUrl = `https://ap-c4yl.onrender.com/api/quotes/${args[1]}`;
        response = await axios.get(apiUrl);
        return m.reply(`_${response.data.quote}_\n\n- *${response.data.author}*`);

      case 'mood':
        apiUrl = `https://ap-c4yl.onrender.com/api/mood`;
        response = await axios.get(apiUrl);
        return m.reply(response.data.mood);

      case 'datetime':
        apiUrl = `https://ap-c4yl.onrender.com/api/datetime`;
        response = await axios.get(apiUrl);
        return m.reply(response.data.datetime);

      case 'anime':
        if (!args[1]) return m.reply('Provide an anime name.');
        apiUrl = `https://anime-api-js7o.onrender.com/api/anime?query=${encodeURIComponent(args.slice(1).join(' '))}`;
        response = await axios.get(apiUrl);
        await Matrix.sendMessage(m.from, { image: { url: response.data.image }, caption: `*${response.data.title}*\n\n${response.data.synopsis}` }, { quoted: m });
        break;

      case 'waifu':
        if (!args[1]) return m.reply('Provide a waifu category.');
        apiUrl = `https://waifu-wnk6.onrender.com/api/waifu/${args[1]}`;
        response = await axios.get(apiUrl);
        await Matrix.sendMessage(m.from, { image: { url: response.data.url }, caption: `*Waifu Category:* ${args[1]}` }, { quoted: m });
        break;

      case 'roast':
        if (!args[1]) return m.reply('Provide a roast category (savage, light, general, savage-burn, funny).');
        apiUrl = `https://roast-api.onrender.com/roast/${args[1]}`;
        response = await axios.get(apiUrl);
        return m.reply(response.data.roast);

      case 'music':
        if (!args[1]) return m.reply('Provide a music name.');
        apiUrl = `https://music-movie-search-api.onrender.com/api/music?q=${encodeURIComponent(args.slice(1).join(' '))}`;
        response = await axios.get(apiUrl);
        await Matrix.sendMessage(m.from, { image: { url: response.data.cover }, caption: `*${response.data.title}* by *${response.data.artist}*\n\n${response.data.lyrics || 'No lyrics found.'}` }, { quoted: m });
        break;

      case 'movie':
        if (!args[1]) return m.reply('Provide a movie name.');
        apiUrl = `https://music-movie-search-api.onrender.com/api/movie?q=${encodeURIComponent(args.slice(1).join(' '))}`;
        response = await axios.get(apiUrl);
        await Matrix.sendMessage(m.from, { image: { url: response.data.poster }, caption: `*${response.data.title}*\n\n${response.data.plot}` }, { quoted: m });
        break;

      case 'neko':
        apiUrl = `https://nekos.life/api/v2/img/neko`;
        response = await axios.get(apiUrl);
        await Matrix.sendMessage(m.from, { image: { url: response.data.url }, caption: 'Here\'s your neko!' }, { quoted: m });
        break;

      case 'dog':
        apiUrl = `https://dog.ceo/api/breeds/image/random`;
        response = await axios.get(apiUrl);
        await Matrix.sendMessage(m.from, { image: { url: response.data.message }, caption: 'Woof woof!' }, { quoted: m });
        break;

      case 'cat':
        apiUrl = `https://api.thecatapi.com/v1/images/search`;
        response = await axios.get(apiUrl);
        await Matrix.sendMessage(m.from, { image: { url: response.data[0].url }, caption: 'Meow!' }, { quoted: m });
        break;

      default:
        return m.reply("❌ Unknown Vanea command category.");
    }

    await Matrix.sendMessage(m.from, { react: { text: "✅", key: m.key } });

  } catch (err) {
    console.error(err);
    await Matrix.sendMessage(m.from, { text: "❌ Error fetching AI response. Try again later." }, { quoted: m });
    await Matrix.sendMessage(m.from, { react: { text: "❌", key: m.key } });
  }
};

export default vanea

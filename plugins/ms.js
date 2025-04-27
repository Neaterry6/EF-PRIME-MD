import axios from 'axios';

const searchCommand = async (m, Matrix) => {
  const prefix = '.';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;
  if (!body || !body.startsWith(prefix)) return;

  const [cmd, ...args] = body.slice(prefix.length).split(' ');
  const query = args.join(' ');
  if (!query) return;

  if (cmd === 'ms') {
    try {
      const res = await axios.get(`https://music-movie-search-api.onrender.com/api/music?q=${encodeURIComponent(query)}`);
      const result = res.data.result;

      await Matrix.sendMessage(m.from, {
        image: { url: result.cover },
        caption: `🎵 *Title:* ${result.title}\n🎙️ *Artist:* ${result.artist}\n💽 *Album:* ${result.album}\n📅 *Release Date:* ${result.releaseDate}`
      }, { quoted: m });

    } catch (err) {
      console.error(err);
      await Matrix.sendMessage(m.from, { text: '❌ Error fetching music data.' }, { quoted: m });
    }
  }

  if (cmd === 'm') {
    try {
      const res = await axios.get(`https://music-movie-search-api.onrender.com/api/movie?q=${encodeURIComponent(query)}`);
      const result = res.data.result;

      await Matrix.sendMessage(m.from, {
        image: { url: result.cover },
        caption: `🎬 *Title:* ${result.title}\n🎭 *Genre:* ${result.genre}\n⭐ *Rating:* ${result.rating}\n📅 *Release Date:* ${result.releaseDate}\n📝 *Description:* ${result.description}`
      }, { quoted: m });

    } catch (err) {
      console.error(err);
      await Matrix.sendMessage(m.from, { text: '❌ Error fetching movie data.' }, { quoted: m });
    }
  }
};

export default ms;

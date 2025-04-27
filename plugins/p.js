import axios from 'axios';

const pCommand = async (m, Matrix) => {
  const prefix = '.';
  const body = m.message.conversation || m.message.extendedTextMessage?.text;
  if (!body.startsWith(prefix)) return;

  const [cmd, ...args] = body.slice(prefix.length).split(' ');
  if (cmd !== 'p') return;

  const input = args.join(' ').toLowerCase();
  const quoted = { quoted: m };

  try {
    if (input.startsWith('send waifu')) {
      const res = await axios.get('https://waifu-wnk6.onrender.com/api/waifu?q=');
      await Matrix.sendMessage(m.from, { image: { url: res.data.url }, caption: '✨ Here’s your waifu!' }, quoted);

    } else if (input.startsWith('generate ')) {
      const prompt = input.replace('generate ', '');
      const res = await axios.get(`https://kaiz-apis.gleeze.com/api/fluxwebui?prompt=${encodeURIComponent(prompt)}`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.url }, caption: `🎨 AI Generated Image for: ${prompt}` }, quoted);

    } else if (input.startsWith('send cat')) {
      const res = await axios.get('https://api.thecatapi.com/v1/images/search');
      await Matrix.sendMessage(m.from, { image: { url: res.data[0].url }, caption: '🐱 Here’s a cat for you!' }, quoted);

    } else if (input.startsWith('send dog')) {
      const res = await axios.get('https://dog.ceo/api/breeds/image/random');
      await Matrix.sendMessage(m.from, { image: { url: res.data.message }, caption: '🐶 Woof woof!' }, quoted);

    } else if (input.startsWith('send neko')) {
      const res = await axios.get('https://nekos.life/api/v2/img/neko');
      await Matrix.sendMessage(m.from, { image: { url: res.data.url }, caption: '😸 Neko time!' }, quoted);

    } else if (input.startsWith('send pexel ')) {
      const query = input.replace('send pexel ', '');
      const res = await axios.get(`https://pexel-api-ery7.onrender.com/api/pexels?q=${encodeURIComponent(query)}`);
      await Matrix.sendMessage(m.from, { image: { url: res.data.url }, caption: `🖼️ Pexels Image for: ${query}` }, quoted);

    } else {
      // If none of the above, treat it as a Deepseek AI text query
      const res = await axios.get(`https://kaiz-apis.gleeze.com/api/deepseek-v3?ask=${encodeURIComponent(input)}`);
      await Matrix.sendMessage(m.from, { text: `🤖 *DeepSeek AI says:*\n${res.data.reply}` }, quoted);
    }

  } catch (err) {
    console.error(err);
    await Matrix.sendMessage(m.from, { text: '❌ Something went wrong fetching your request.' }, quoted);
  }
};

export default pCommand

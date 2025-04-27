import axios from 'axios';

const pexels = {
  name: 'pexels',
  description: 'Fetch beautiful images from Pexels',
  category: 'Media',
  async execute(m, sock, args) {
    const query = args.join(" ") || "nature";

    await sock.sendMessage(m.from, {
      react: { text: '🖼️', key: m.key },
    });

    try {
      // Fetch images from API
      const res = await axios.get(`https://pexel-api-ery7.onrender.com/api/pexels?q=${query}`);
      const images = res.data.results.slice(0, 3); // Select up to 3 images

      if (images.length === 0) {
        return sock.sendMessage(m.from, {
          text: `❌ *No images found for:* _"${query}"_`,
        }, { quoted: m });
      }

      // Beautify the output message
      const message = images.map((img, i) => ({
        image: { url: img.url },
        caption: `
╔═════📸 *PEXELS IMAGE ${i + 1}* 📸═════╗
║  
║  🎯 *Search Query:* _${query}_
║  🏆 *Photographer:* ${img.photographer}
║  🔗 *Image URL:* [Click Here](${img.url})
║  
║  🎀 *Powered by Pexels API*
║  
╚═════════════════════════════╝
        `.trim(),
      }));

      // Send messages with beautifully formatted captions
      await sock.sendMessage(m.from, message, { quoted: m });

    } catch (error) {
      console.error('[PEXELS ERROR]:', error);
      await sock.sendMessage(m.from, {
        text: `❌ *An error occurred while fetching images.*`,
      }, { quoted: m });
    }
  }
};

export default pexels

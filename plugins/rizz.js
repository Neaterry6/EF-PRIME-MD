import axios from 'axios';

const rizz = {
  name: 'rizz',
  description: 'Drop a smooth pickup line (Rizz)',
  category: 'Fun',
  async execute(m, sock) {
    try {
      // Sending a loading message
      const loading = await sock.sendMessage(m.from, {
        text: '⏳ *Fetching a smooth Rizz line...*',
      }, { quoted: m });

      // Fetching data from API
      const res = await axios.get('https://pinkupline-api.onrender.com/random');
      const data = res.data;

      // Structuring output with an elegant design
      const result = `
╔════◇🎀 *RIZZ GENERATOR* 🎀◇════╗
║  
║  🎯 *API RESPONSE*
║  ─────────────────────────
║  🔗 *URL:* https://pinkupline-api.onrender.com/random
║  ✅ *Status:* 200 OK
║  
║  💬 *Pickup Line:*
║  
║  🎀 *"${data.line}"*
║  
╚═════════════════════════════╝
      `.trim();

      // Sending formatted message
      await sock.sendMessage(m.from, { text: result }, { quoted: m });

      // Adding a reaction to acknowledge completion
      await sock.sendMessage(m.from, { react: { text: '🎀', key: loading.key } });

    } catch (error) {
      console.error('[RIZZ ERROR]:', error);
      await sock.sendMessage(m.from, {
        text: '❌ *Failed to fetch a Rizz line.*',
      }, { quoted: m });
    }
  }
};

export default rizz;

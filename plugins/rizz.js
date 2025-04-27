import axios from 'axios';

const rizzCommand = {
  name: 'rizz',
  description: 'Get a random Rizz pick-up line',
  category: 'Fun',

  async execute(m, Matrix, args) {
    try {
      // Fetch from API
      const response = await axios.get('https://pinkupline-api.onrender.com/random');

      // Check if line exists
      if (!response.data || !response.data.line) {
        await Matrix.sendMessage(m.from, {
          text: '❌ Could not fetch a pick-up line right now.'
        }, { quoted: m });
        return;
      }

      const rizzLine = response.data.line;

      // Styled response message
      const result = `
╭━━━〔 ✨ *RIZZ PICK-UP LINE* ✨ 〕━━━⊰
┃  
┃ 💖 ${rizzLine}
┃  
┃ 🎀 _Drop this on someone special!_
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊱
      `.trim();

      // Send message
      await Matrix.sendMessage(m.from, {
        text: result
      }, { quoted: m });

    } catch (error) {
      console.error('[RIZZ CMD ERROR]:', error);
      await Matrix.sendMessage(m.from, {
        text: '❌ An error occurred while fetching a pick-up line.'
      }, { quoted: m });
    }
  }
};

export default rizzCommand;

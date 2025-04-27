import axios from 'axios'
import chalk from 'chalk'

const Rizz = {
  name: 'rizz',
  description: 'Drop a random smooth pickup line (Rizz)',
  category: 'Fun',
  async execute(m, sock, args) {
    try {
      // Send an awaiting message
      const awaitingMessage = await sock.sendMessage(m.from, { text: "🎩 *Summoning the Ultimate Rizz Line...* 💭" }, { quoted: m });

      // React to that message
      await sock.sendMessage(m.from, {
        react: { text: "🔥", key: awaitingMessage.key }
      });

      // Fetch the Rizz pickup line
      const response = await axios.get('https://pinkupline-api.onrender.com/random');
      const pickupLine = response.data.line;

      // Delete the awaiting message after 3 seconds
      setTimeout(async () => {
        await sock.sendMessage(m.from, {
          delete: {
            id: awaitingMessage.key.id,
            remoteJid: m.from,
            fromMe: true
          }
        });
      }, 3000);

      // Send the stylish Rizz pickup line message
      const rizzText = `
╭━━━〔 🎩 *𝗥𝗜𝗭𝗭 𝗠𝗔𝗦𝗧𝗘𝗥* 🎩 〕━━━⊰  
┃ 💘 *Titan Rizz Activated!*  
┃ 🔥 “${pickupLine}”  
┃  
┃ 😏 *Drop this line and let fate decide!*  
┃ 🎀 *Your charm level is MAX!*  
┣━━━━━━━━━━━━━━━━━━━━━━  
┃ 🎭 *Confidence Level:* 💯  
┃ 🕶️ *Swagger:* ✅  
┃ 💡 *Guaranteed Success:* Unknown 😉  
╰━━━━━━━━━━━━━━━━━━━━━━⊱  
`;

      await sock.sendMessage(m.from, { text: rizzText }, { quoted: m });
      console.log(chalk.green('[RIZZ] Pickup line sent successfully.'));

    } catch (error) {
      console.log(chalk.red('[ERROR] Failed to fetch pickup line:'), error);
      await sock.sendMessage(m.from, { text: '❌ *Oops! The Rizz Gods are resting... Try again later, King!* 😢' }, { quoted: m });
    }
  }
}

export default Rizz

import fs from 'fs';

const disableFile = './disable-react.json';

const autoreact = {
  name: 'blockreact',
  description: 'Block any active auto-react from index',
  category: 'Owner',
  async execute(m, sock, args) {
    // Set disable flag
    fs.writeFileSync(disableFile, JSON.stringify({ disabled: true }, null, 2));
    await sock.sendMessage(m.from, { text: '✅ Autoreact reactions have been forcefully disabled.' }, { quoted: m });
  }
};

export default autoreact

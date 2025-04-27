import { exec } from 'child_process';

const shell = {
  name: 'shell',
  description: 'Execute shell commands from WhatsApp (owner only)',
  category: 'Owner',
  async execute(m, sock, args) {
    try {
      const commandText = args.join(" ");
      if (!commandText) {
        await sock.sendMessage(m.from, { text: '⚠️ *Provide a shell command to execute.*' }, { quoted: m });
        return;
      }

      const awaitingMessage = await sock.sendMessage(m.from, { text: '⏳ *Running your shell command...*' }, { quoted: m });

      exec(commandText, (err, stdout, stderr) => {
        if (err) {
          const errorResult = `
╭━━━〔 ❌ *ERROR OCCURRED* ❌ 〕━━━⊰
┃  
┃  ${stderr || err.message}
┃  
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊱
          `.trim();

          sock.sendMessage(m.from, { text: errorResult }, { quoted: m });
          sock.sendMessage(m.from, { react: { text: '🥺', key: awaitingMessage.key } });
          return;
        }

        const finalOutput = stdout.trim() || "✅ *Command executed successfully with no output.*";

        const result = `
╭━━━〔 ✅ *COMMAND RESULT* ✅ 〕━━━⊰
┃  
${finalOutput.split("\n").map(line => `┃  ${line}`).join("\n")}
┃  
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊱
        `.trim();

        sock.sendMessage(m.from, { text: result }, { quoted: m });
        sock.sendMessage(m.from, { react: { text: '✅', key: awaitingMessage.key } });
      });

    } catch (error) {
      console.error('[SHELL COMMAND ERROR]:', error);
      await sock.sendMessage(m.from, { text: '❌ *An unexpected error occurred.*' }, { quoted: m });
    }
  }
};

export default shell;

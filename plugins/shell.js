import { exec } from 'child_process';

const shell = {
  name: 'shell',
  description: 'Execute shell commands from WhatsApp (owner only)',
  category: 'Owner',
  async execute(m, sock, args) {
    try {
      const text = args.join(" ");
      if (!text) {
        return sock.sendMessage(m.from, { text: '⚠️ *Provide a shell command to execute.*' }, { quoted: m });
      }

      await sock.sendMessage(m.from, { text: '⏳ *Executing shell command... please wait.*' }, { quoted: m });

      exec(text, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
        if (error) {
          const errMsg = `❌ *Execution Error:*\n\`\`\`${error.message}\`\`\``;
          sock.sendMessage(m.from, { text: errMsg }, { quoted: m });
          return;
        }

        if (stderr) {
          const stderrMsg = `⚠️ *Stderr Output:*\n\`\`\`${stderr}\`\`\``;
          sock.sendMessage(m.from, { text: stderrMsg }, { quoted: m });
          return;
        }

        let result = stdout.trim();
        if (result.length === 0) result = "✅ *Command executed successfully with no output.*";

        const finalReply = `
╭━━━〔 ⚙️ *SHELL EXECUTOR* ⚙️ 〕━━━⊰
┃ 🔸 *Input:* \`${text}\`
┣━━━━━━━━━━━━━━━━━━━━━━
┃ 📥 *Output:*
┃ \`\`\`${result}\`\`\`
╰━━━━━━━━━━━━━━━━━━━━━━⊱
        `;
        sock.sendMessage(m.from, { text: finalReply }, { quoted: m });
      });

    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.from, { text: '❌ *An unexpected error occurred while executing the command.*' }, { quoted: m });
    }
  }
};

export default shell;

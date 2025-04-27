import { exec } from 'child_process';

const shell = {
  name: 'shell',
  description: 'Execute shell commands from WhatsApp (owner only)',
  category: 'Owner',
  async execute(m, sock, args) {
    try {
      const text = args.join(" ");
      if (!text) return sock.sendMessage(m.from, { text: '⚠️ Provide a shell command to execute.' }, { quoted: m });

      await sock.sendMessage(m.from, { text: '⏳ *Running shell command...*' }, { quoted: m });

      exec(text, (err, stdout, stderr) => {
        if (err) {
          sock.sendMessage(m.from, { text: `❌ *Error:*\n\`\`\`${stderr}\`\`\`` }, { quoted: m });
          return;
        }
        if (stdout.length === 0) stdout = "✅ Command executed with no output.";

        sock.sendMessage(m.from, { text: `\`\`\`${stdout}\`\`\`` }, { quoted: m });
      });

    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.from, { text: '❌ An error occurred while running the shell command.' }, { quoted: m });
    }
  }
};

export default shell

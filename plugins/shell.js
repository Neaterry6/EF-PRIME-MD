import { exec } from 'child_process';

const shell = {
  name: 'shell',
  description: 'Execute shell commands from WhatsApp (owner only)',
  category: 'Owner',
  async execute(m, sock, args) {
    try {
      const text = args.join(" ");
      if (!text) {
        return sock.sendMessage(m.from, { text: '⚠️ Provide a shell command to execute.' }, { quoted: m });
      }

      // Send awaiting message
      const awaitingMessage = await sock.sendMessage(m.from, { text: '⏳ *Running your shell command...*' }, { quoted: m });

      // Execute shell command
      exec(text, async (err, stdout, stderr) => {
        if (err) {
          await sock.sendMessage(m.from, { 
            text: `❌🥺 *Error:*\n\`\`\`${stderr || err.message}\`\`\``, 
          }, { quoted: m });
          await sock.sendMessage(m.from, { react: { text: '❌🥺', key: awaitingMessage.key } });
          return;
        }

        const output = stdout.trim() || "✅🥺 Command executed successfully with no output.";

        // Build styled output box
        const boxedOutput = `
╭━━━〔 🖥️ *SHELL COMMAND OUTPUT* 🖥️ 〕━━━⊰  
┃  
┃ 📥 *Command:*\n${text}
┃  
┃ 📤 *Output:*
┃ \`\`\`${output}\`\`\`
┃  
┃ ✅🥺 *Execution Completed*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊱  
        `;

        await sock.sendMessage(m.from, { text: boxedOutput.trim() }, { quoted: m });
        await sock.sendMessage(m.from, { react: { text: '✅🥺', key: awaitingMessage.key } });
      });

    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.from, { text: '❌🥺 An error occurred while running the shell command.' }, { quoted: m });
    }
  }
};

export default shell;

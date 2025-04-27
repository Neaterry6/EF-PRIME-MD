import { exec } from 'child_process';

const install = {
  name: 'install',
  description: 'Install one or more npm packages on the host machine',
  category: 'Owner',
  async execute(m, Matrix, args) {
    if (args.length === 0) {
      await Matrix.sendMessage(m.from, { text: '❌ Provide package names to install.' }, { quoted: m });
      return;
    }

    const packages = args.join(' ');
    const command = `npm install ${packages} --no-save --no-package-lock`;

    await Matrix.sendMessage(m.from, { text: `📦 Installing:\n\`\`\`${packages}\`\`\`` }, { quoted: m });

    exec(command, (error, stdout, stderr) => {
      let response = '';

      if (error) {
        response += `❌ Error:\n\`\`\`${error.message}\`\`\`\n`;
      }
      if (stderr) {
        response += `⚠️ Stderr:\n\`\`\`${stderr}\`\`\`\n`;
      }
      if (stdout) {
        response += `✅ Stdout:\n\`\`\`${stdout}\`\`\``;
      }

      Matrix.sendMessage(m.from, { text: response || '✅ Packages installed successfully.' }, { quoted: m });
    });
  }
};

export default install

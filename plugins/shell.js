import { exec } from "child_process";
import config from "../config.cjs";

const shellCommand = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const query = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd !== "shell") return;

  if (!query) {
    return Matrix.sendMessage(m.from, { text: "❌ Usage: .shell [command]" }, { quoted: m });
  }

  try {
    await Matrix.sendMessage(m.from, { react: { text: "⚙️", key: m.key } });

    exec(query, { maxBuffer: 1024 * 5000 }, (error, stdout, stderr) => {
      let response = "";

      if (error) response += `❌ Error:\n${error.message}\n\n`;
      if (stderr) response += `⚠️ Stderr:\n${stderr}\n\n`;
      if (stdout) response += `✅ Output:\n${stdout}`;

      if (!response.trim()) response = "✅ Command executed successfully.";

      Matrix.sendMessage(
        m.from,
        { text: `🖥️ *Shell Output*\n━━━━━━━━━━━━━━━━━━━━━\n${response.trim()}` },
        { quoted: m }
      );

      Matrix.sendMessage(m.from, { react: { text: "✅", key: m.key } });
    });
  } catch (err) {
    console.error("Shell Command Error:", err);
    Matrix.sendMessage(
      m.from,
      { text: "❌ An error occurred while executing the command." },
      { quoted: m }
    );
  }
};

export default shellCommand;

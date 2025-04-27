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

    exec(query, (error, stdout, stderr) => {
      if (error) {
        Matrix.sendMessage(
          m.from,
          { text: `❌ Error:\n${error.message}` },
          { quoted: m }
        );
        return;
      }
      if (stderr) {
        Matrix.sendMessage(
          m.from,
          { text: `⚠️ Stderr:\n${stderr}` },
          { quoted: m }
        );
        return;
      }

      const output = stdout || "✅ Command executed successfully.";

      Matrix.sendMessage(
        m.from,
        {
          text: `🖥️ *Shell Output*\n━━━━━━━━━━━━━━━━━━━━━\n${output}`,
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363419090892208@newsletter",
              newsletterName: "EF-PRIME",
              serverMessageId: 145,
            },
          },
        },
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

import axios from "axios";
import config from "../config.cjs";

const transcribe = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

  if (cmd === "transcribe") {
    try {
      const start = new Date().getTime();

      if (!m.audioMessage) {
        await Matrix.sendMessage(m.from, { text: "⚠️ Please send a voice note to transcribe!" }, { quoted: m });
        return;
      }

      // Download the voice note
      const voiceNoteUrl = await Matrix.downloadMediaMessage(m);
      
      // Send the voice note to the Transcribe API
      const formData = new FormData();
      formData.append("audio", voiceNoteUrl);

      const response = await axios.post("https://transcribe-fwsw.onrender.com/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const transcription = response.data.transcription;

      const reactionEmojis = ["📝", "🎤", "🗣️", "🔊", "📜", "🎀"];
      const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];

      const end = new Date().getTime();
      const responseTime = (end - start) / 1000;
      
      const text = `📦 *Voice Note Transcription* 📦\n━━━━━━━━━━━━━━━━━\n🎀 *Processing Time:* ${responseTime.toFixed(2)}s ${reactionEmoji}\n📝 *Transcription:* ${transcription}\n━━━━━━━━━━━━━━━━━`;

      await Matrix.sendMessage(m.from, { text }, { quoted: m });

    } catch (error) {
      console.error("Transcription failed:", error);
      await Matrix.sendMessage(m.from, { text: "⚠️ Failed to transcribe voice note, try again later!" }, { quoted: m });
    }
  }
};

export default transcribe

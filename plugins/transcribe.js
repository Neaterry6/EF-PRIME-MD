import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { downloadMediaMessage } from "@whiskeysockets/baileys";
import config from "../config.cjs";

const scribe = async (m, Matrix) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

    const validCommands = ["scribe", "transcribe", "speech-to-text"];
    if (!validCommands.includes(cmd)) return;

    const quoted = m.quoted || {}; 
    const isQuotedAudio = quoted && (quoted.mtype === "audioMessage" || quoted.mtype === "videoMessage");
    const isDirectAudio = m.message?.audioMessage || m.message?.videoMessage;

    // 🔹 Ensure user sent **or replied to** a voice note
    if (!isDirectAudio && !isQuotedAudio) {
      return await Matrix.sendMessage(
        m.from,
        { text: "⚠️ *Please send or reply to a voice note to transcribe!* 🎙️" },
        { quoted: m }
      );
    }

    // 🔹 Download the correct voice note
    const mediaBuffer = isDirectAudio ? await downloadMediaMessage(m, "buffer") : await downloadMediaMessage(quoted, "buffer");
    const filePath = `uploads/temp_audio.mp3`;
    fs.writeFileSync(filePath, mediaBuffer);

    // 🔹 Verify the audio file exists before sending
    if (!fs.existsSync(filePath)) {
      return m.reply("⚠️ *Error: Audio file wasn't saved correctly!* ❌");
    }

    // 🔹 Send the audio file to your transcription API
    const formData = new FormData();
    formData.append("audio", fs.createReadStream(filePath));

    m.reply("📝 *Transcribing... Please wait!*");

    try {
      const response = await axios.post("https://transcribe-c7cd.onrender.com/transcribe", formData, {
        headers: { ...formData.getHeaders() },
      });

      if (!response.data || !response.data.transcription) {
        throw new Error("Invalid response from API");
      }

      const transcription = response.data.transcription;

      // 🎀 Beautified response 🎀
      const txt = `╭──「 🎤 *Transcription Result* 」─╮
│  
│ 📝 *Text:* ${transcription}
│ 🚀 *Processed via AI Speech-to-Text*
│ ⏱️ *Fast & Accurate*
│  
╰────────────╯`;

      fs.unlinkSync(filePath);
      m.reply(txt);
    } catch (apiError) {
      console.error("Transcription API Error:", apiError);
      m.reply("❌ *Transcription failed due to an API issue. Please try again later!*");
    }
  } catch (error) {
    console.error("Error:", error);
    m.reply("❌ *An error occurred while processing the command.*");
  }
};

export default scribe;

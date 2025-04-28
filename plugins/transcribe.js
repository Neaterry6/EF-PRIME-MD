import config from '../config.cjs';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const scribe = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd !== 'scribe') return;

  // 🔹 Check if the message contains an audio file
  const hasNewMedia = m.hasMedia && (m.type === 'audio' || m.type === 'voice');

  // 🔹 Check if the user replied to an audio/voice message
  const quotedMessage = m.quoted ? m.quoted : null;
  const isVoiceReply = quotedMessage && (quotedMessage.type === 'audio' || quotedMessage.type === 'voice');

  if (!hasNewMedia && !isVoiceReply) {
    return await Matrix.sendMessage(m.from, {
      text: "⚠️ *Please send or reply to a voice note to transcribe!* 🎙️",
      contextInfo: { mentionedJid: [m.sender] }
    }, { quoted: m });
  }

  // 🔹 Download the correct voice note
  const media = hasNewMedia ? await Matrix.downloadMediaMessage(m) : await Matrix.downloadMediaMessage(quotedMessage);
  const filePath = `uploads/temp_audio.mp3`;
  fs.writeFileSync(filePath, media);

  // 🔹 Send the audio file to your transcription API
  const formData = new FormData();
  formData.append('audio', fs.createReadStream(filePath));

  try {
    const response = await axios.post("https://transcribe-c7cd.onrender.com/transcribe", formData, {
      headers: { ...formData.getHeaders() }
    });

    const transcription = response.data.transcription || "⚠️ Transcription failed.";

    // 🎀 Beautified response 🎀
    const statusMessage = `╭──「 🎤 *Transcription Result* 」─╮
│  
│ 📝 *Text:* ${transcription}
│ 🚀 *Processed via AssemblyAI API*
│ ⏱️ *Speed: Fast & Accurate*
│  
╰────────────╯`;

    await Matrix.sendMessage(m.from, {
      text: statusMessage,
      contextInfo: { mentionedJid: [m.sender] }
    }, { quoted: m });

    // Cleanup temporary file
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("Error transcribing audio:", error);

    await Matrix.sendMessage(m.from, {
      text: "⚠️ *Something went wrong while transcribing. Please try again later!* ❌",
      contextInfo: { mentionedJid: [m.sender] }
    }, { quoted: m });
  }
};

export default scribe;

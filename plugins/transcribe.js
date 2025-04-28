import config from '../config.cjs';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const scribe = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd !== 'scribe') return;
  
  if (!m.hasMedia) {
    return await Matrix.sendMessage(m.from, {
      text: "⚠️ *Please send an audio file to transcribe!* 🎙️",
      contextInfo: { mentionedJid: [m.sender] }
    }, { quoted: m });
  }

  // Download the audio file
  const media = await Matrix.downloadMediaMessage(m);
  const filePath = `uploads/temp_audio.mp3`;
  fs.writeFileSync(filePath, media);

  // Prepare the request to your API (No API key needed)
  const formData = new FormData();
  formData.append('audio', fs.createReadStream(filePath));

  try {
    const response = await axios.post("https://transcribe-c7cd.onrender.com/transcribe", formData, {
      headers: { ...formData.getHeaders() }
    });

    const transcription = response.data.transcription || "⚠️ Transcription failed.";
    
    // Beautified response 🎀✨
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

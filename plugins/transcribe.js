import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import config from '../config.cjs';

const scribe = async (m, Matrix) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['scribe', 'transcribe', 'speech-to-text'];
    if (!validCommands.includes(cmd)) return;

    const quoted = m.quoted || {}; 

    // 🔹 Ensure user sent **or replied to** a voice note
    if (!quoted || (quoted.mtype !== 'audioMessage' && quoted.mtype !== 'videoMessage')) {
      return m.reply('⚠️ *Please send or reply to a voice note to transcribe!* 🎙️');
    }

    try {
      const media = await m.quoted.download();
      const filePath = `uploads/${Date.now()}.mp3`;
      fs.writeFileSync(filePath, media);

      m.reply('📝 *Transcribing... Please wait!*');

      // 🔹 Send the audio file to your transcription API
      const formData = new FormData();
      formData.append('audio', fs.createReadStream(filePath));

      const response = await axios.post("https://transcribe-c7cd.onrender.com/transcribe", formData, {
        headers: { ...formData.getHeaders() }
      });

      const transcription = response.data.transcription || "⚠️ Transcription failed.";

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
    } catch (error) {
      console.error(error);
      m.reply('⚠️ *An error occurred during transcription. Please try again!* ❌');
    }
  } catch (error) {
    console.error('Error:', error);
    m.reply('❌ *An Error Occurred While Processing The Command.*');
  }
};

export default scribe;

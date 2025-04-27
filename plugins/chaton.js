import axios from 'axios';
import { default as makeWASocket, useMultiFileAuthState } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';

const session = './session'; // your session folder path
const logger = pino();
let chatSessions = {}; // Track which chats have AI chat active

// Load the session and create the connection
const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState(session);
  const Matrix = makeWASocket({
    logger,
    printQRInTerminal: true,
    auth: state
  });

  Matrix.ev.on('creds.update', saveCreds);

  // Message listener
  Matrix.ev.on('messages.upsert', async (mdata) => {
    const m = mdata.messages[0];
    if (!m.message) return;

    const from = m.key.remoteJid;
    const fromMe = m.key.fromMe;
    const body = m.message.conversation || m.message.extendedTextMessage?.text;

    if (!body) return;

    const prefix = '.';
    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(prefix.length).trim().split(/\s+/).shift().toLowerCase() : null;
    const args = isCmd ? body.slice(prefix.length).trim().split(/\s+/).slice(1) : [];

    // If it's the chaton command
    if (isCmd && command === 'chaton') {
      const option = args[0]?.toLowerCase();
      if (option === 'on') {
        chatSessions[from] = true;
        await Matrix.sendMessage(from, { text: '🤖 Chatbot *activated* in this chat!' }, { quoted: m });
      } else if (option === 'off') {
        chatSessions[from] = false;
        await Matrix.sendMessage(from, { text: '🛑 Chatbot *deactivated* in this chat!' }, { quoted: m });
      } else {
        await Matrix.sendMessage(from, { text: `⚙️ Usage:\n${prefix}chaton on\n${prefix}chaton off` }, { quoted: m });
      }
      return;
    }

    // Auto reply if chatbot is active and message isn't from bot
    if (chatSessions[from] && !fromMe) {
      try {
        const res = await axios.post("https://ap-c4yl.onrender.com/chat/ask", {
          userID: from,
          message: body
        }, {
          headers: { 'sessionID': 'your-session-id' }
        });

        const reply = res.data.message;
        await Matrix.sendMessage(from, { text: reply }, { quoted: m });
      } catch (err) {
        console.error('Chatbot API Error:', err.message);
        await Matrix.sendMessage(from, { text: '❌ Failed to get a reply from AI.' }, { quoted: m });
      }
    }
  });
};

startBot()

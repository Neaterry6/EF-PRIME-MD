// config.js - Optimus Prime Bot Configuration
// Author: Frank kaumba dev

const fs = require("fs");
require("dotenv").config();
const config = {

  SESSION_ID: process.env.SESSION_ID || "EF-PRIME;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0orZE9CWWwwT3lPT29IZno4WERuc01Md01GbjRNWGhOZTU2THNkd1ltND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibGx3YzlET0xzWUwzVUZWci9ZeHoyUkUyT3c1djczaWVWYUkyQXd6QTRqND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRR0tkRHBjbmRKS0xRYndBdEQ3czlzMUxFOG9jWEh3V2ovV1Nja1BPMzJrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUSEdwa3pQdWlQVkJvUld4YXd3eUxEbmFrVlU2d2RyTk1Na2VleUlFYURJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFQMWVZNEZYR2IrM1BOQk1sdGJ4cjFHWEkwMXZ5T2RxdzgwYjVrVUg3bVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVWUFdMNWNqOGlDRVZjK0RaaW9WeXA1Mm5TckNnQU5nSE5jN2ZQcUlhQW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUt4ZlhIaTF6ZkVXT0pwdFBSWTBKbjJQZUZTTS9Id3RTbTVsVUJDQ00wQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGpoOWxnNEdleG9NaG1OQXNNWTdWQjlKQ3lrcFRZaDlpL0FxNC9HZGh5OD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iktyc1dFZTAwY2x4V3FjVEZ4NU9rcmVtOElOMGNrUk1TMlFvSVBVZU9lRThLK3FOOU8wd25BNktCQUI5c1NOT2hBSWV5T1padlRSbm9TSkJENFBFV2h3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU2LCJhZHZTZWNyZXRLZXkiOiJucXE2VFVtbVltckxsVnRiU2RSZENJbkxRMTFXVWZtYkxZUjUxTWxZbTdvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ0Sjc5NVU4dlJDYVdEV19BeERTUzNBIiwicGhvbmVJZCI6ImIzNTJjMzE3LWIxY2ItNDU2Yy1iN2Y5LWU4YzUwNjhmYmY2NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmcGYrUG9iOGRyR3UrUDR3dlN2Tm1mV3UwOEk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOW5GUDJBZlRaeHlnL0RUbGRUMEVhOEM0RnI0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ijg5Vk5YOVcxIiwibWUiOnsiaWQiOiIyMzQ4MDM5ODk2NTk3Ojc2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJV3UzTndERU1iYnM4QUdHQmdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI4RklTR2Z1b1Z6NExGa0dtYUFpWnY3L2k1QVFMQmRVMkwxcnQyT2l3a1gwPSIsImFjY291bnRTaWduYXR1cmUiOiJRTGw3TmxTcmEvT0t5UEk4U0M0RkJkbmo2cTA0NndwTlAxU2d6RnFXM2FQUjIwd0tSeXlWYnlaU0l6SVRxdzlUc25nMjN6Q0JnRHVubVlaamROWU1BUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRkJpUE1OR3RPR2hmdFcrb1RQNG1RMXNqOEE1T1ovbzNRUWQzRGlyY1krV3FMK1ppUkduL0ZkNDhjbUNWTmdocWdzYXlpS2ZwSmZqbVdSWGpUUFBKanc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDM5ODk2NTk3Ojc2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZCU0VobjdxRmMrQ3haQnBtZ0ltYisvNHVRRUN3WFZOaTlhN2Rqb3NKRjkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU2Nzc3ODIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRU03In0=",
  PREFIX: process.env.PREFIX || '.',
  
  // Message Protection
  ANTI_DELETE: process.env.ANTI_DELETE !== undefined ? process.env.ANTI_DELETE === 'true' : false, 
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : false, 
  AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY !== undefined ? process.env.AUTO_STATUS_REPLY === 'true' : false,
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || '',
  
  // Communication Protocols
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
  
  // Defensive Systems
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  
  // Command Mode
  MODE: process.env.MODE || "private",
  
  // Alliance Info
  OWNER_NAME: process.env.OWNER_NAME || "Frank kaumba",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "2348039896597",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyA3-FskH71WtIQbzrhMA7WAC4Th2zqSNiE",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};

module.exports = config;

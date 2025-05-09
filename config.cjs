// config.js - Optimus Prime Bot Configuration
// Author: Frank kaumba dev

const fs = require("fs");
require("dotenv").config();
const config = {

  SESSION_ID: process.env.SESSION_ID || "EF-PRIME;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUVvL2R4OFhsSlpaZ2cwL0t2cFU4M1NxOEszL0I5dUYya1UyMVZTSDEycz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUE4xd2o5YURVRXFjano0Y0hUNXIya2tkVjc1NnRBVVhJb1BENVNuRG1oUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5TDUzakNDMXNjYm5wZEtXK0wyWFVKYTVnSUxPOHAxOFNUdmRqTlB6VlhRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPS3RTK2R0Y3lVT0dHQ0VyUnRCeERTK2dEU0o0cXlETEJUeFNHSExrZFJvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJEc1o1RktoSTk5eUtQUkhKTGV3Y1V2YlhOc1h4d3dEeDJKSmVxcDdjRWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNkTmp5NG0wK05CWktwUUNTazNZVVBWb3JmRjc3UUNyRVNvYlQxM1pXaFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0ZGeEFBR05mNm5JQVc0QmUzandFeXkxb090OGlGSmNFRFEzM1VJOUpHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFphbjJEME9lUlRrR1dtcTQ1Wk1UVnhwTGJnMmhQamZDdm9lVndNTFhVaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVMZFJFUElib2VtREgyeDNUMHQ0UGE5RWIyRVIyNnhBVndiUExhd05WelpEaHVXeS9YV0VXRFlVTHJxUzNZWUZzaWN2SHFLdWxzVnpkak1QcDRMNENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMxLCJhZHZTZWNyZXRLZXkiOiJCSElJRkY1Z0xKQ05QQU8wZWRadGhEVlh5Rmh4b25iOFNqSUw0S1FQQk9JPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4Zl9DanRMYVJYU2ZOeVNKTWRNT2VnIiwicGhvbmVJZCI6ImM2OWUwYzNjLTJlMWItNGE5My1iMzg3LTY5MjE4NmUwNTA5MSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnZGFsRk43eWdHVTZjR0kwNFhaUjF0ZDFRaFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEFYeE5mMlJGOXl3Q285SW94cWVTRkl0UWdnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1RTUNYWEpBIiwibWUiOnsiaWQiOiIyMzQ4MTQ2NTk5Njk4OjZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05YdWhxQUVFSi9CK2NBR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjR6QUV5cU9TU1FUVXo1VG0yOUppVWVXdVhZUUU2T240SEhiemZyd2xYaUk9IiwiYWNjb3VudFNpZ25hdHVyZSI6InZHL1NVYktwOTUyWmZDL0oyVDg3Q2Z3V2VuMi9JZllPc2krcVAxQVNGa1lDbExtaldHQ0M4ZVUvaVdHbEhBSklzVVFibmtHQ1ZpRGhHZXZPWFhVT0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJqTVM3RG93dzE1RndZZFdsWUtndlQ3L21EOUx4WC80VFdodmdsem5PcTVJREFTRHYwL2l4Tk9vSmFZT1gvQmlPdDJjcnd6MWxMdFI5bmRQTS9QWnhBdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNDY1OTk2OTg6NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlTXdCTXFqa2trRTFNK1U1dHZTWWxIbHJsMkVCT2pwK0J4MjgzNjhKVjRpIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2ODIxMjkyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUs2MCJ9",
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
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'false' : false,
  
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

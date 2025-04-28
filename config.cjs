// config.js - Optimus Prime Bot Configuration
// Author: Frank kaumba dev

const fs = require("fs");
require("dotenv").config();
const config = {

  SESSION_ID: process.env.SESSION_ID || "EF-PRIME;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0daUVlYc0ZFOGhVMVVLSEhQVGpFczNpNHplQkFjU0EydkUyUnRSbnJYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibXg5blpXbUlXeVRobWQwcEZnbW1IRHhiT3VRaVhlRXNkYmwyN3A5OU9TOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRC9uNWRSZnRiZWorT1VpM1J5WVc4QlVxd0h3UThsQUV5M0V3enFwTDJvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxVWQ0Wkc5RXU2WUpSRjZoRnFLUEs2UE0wUzVSVGxaQ0tmN2gyWlF4YlRzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNMMDBNY3h5MDdpQWZubnFmSmx2V0p5RWFBMDg1VGIrdjNXMUZTYmtjbHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5VTkRIVlMyWDAzay93d0dHMkFtRS82T0JOWnNjcXpKVUhoUUNieWdKMWM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUNWY0ZpR250Q1B3OWhhSWFCeGVOUzNxRUpVeFhDeDVaTTc0UmQ1WW1Gaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnpXNjhtOHh0NUp1L2hXUEpIdjRMakxMd1FhK295bkRtUXIzNlYvOVVEST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkljblFZZUtaeGFNL1FidFFUdmtFV1VMdFhvUkFyUDJvbUpxVUNKbXNBK1ZJNEtQUDVHeFpWTWtPZy9IcmlERTBYVm9iRURxTVc4Z0VTMXR1bU1LR0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDIsImFkdlNlY3JldEtleSI6IjI1R2R2WE9HM1hlWUNkSjl3RzM3S3BoWEt2Z2s3TzV3bG0xYUR1ZVNiLzQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE0NjU5OTY5OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxRjE4RjE4NDJERUYwNTE1Njg0NkNDNzEyM0Q5MzE5RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1ODQ3NDk5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJMUXJzSUEzdVJyVzV3RVBFRDd3LVV3IiwicGhvbmVJZCI6ImIxNDk0Y2YzLWExODgtNGE4Yi04ZWE0LTZhOGM5MjM4NDViNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsZy9PSnFBUGI3M2ZKSHlEeU5RZytEbForeFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSytEZTF5YzJERHpJT05JN252ZU1WR1pFeXZVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRCWlZETE45IiwibWUiOnsiaWQiOiIyMzQ4MTQ2NTk5Njk4OjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQsO8w7HDsXkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05UdWhxQUVFTENKdnNBR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjR6QUV5cU9TU1FUVXo1VG0yOUppVWVXdVhZUUU2T240SEhiemZyd2xYaUk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkdrV1Voai9CUFdrcUZINEE3dk8wOHVpUUUzS0I0bEhWdVJhQ2wzeXZMNEpnRmI0MlVoUmFYVUUyQ0tNcEJlRnY5WGVielJsVERwZW1zSUxBVkN4bkN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJWbHE1YWZidmhTKzdDNzZ1bVU2Y2tCSVB5VVJkOG5sditsVWFndmJLWk1Bb2RDN2ZiMEZ5MkxPSWcxRFpkT2RpRlZZTzhTemx3ZEw5WTFvMmhjS21CZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNDY1OTk2OTg6NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlTXdCTXFqa2trRTFNK1U1dHZTWWxIbHJsMkVCT2pwK0J4MjgzNjhKVjRpIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1ODQ3NDg2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5aUyJ9",
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

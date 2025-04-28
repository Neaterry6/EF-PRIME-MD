// config.js - Optimus Prime Bot Configuration
// Author: Frank kaumba dev

const fs = require("fs");
require("dotenv").config();
const config = {

  SESSION_ID: process.env.SESSION_ID || "EF-PRIME;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK044NitYUnRYbmRRUys2WERjRUR6RktpWHVzVWNSeFVZWHZZK2dua0lHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidE1EK2l1ZTU1T28yU2xHYmI1Um9tVWlzSkpWRGtqM0VHQW1oZUxCVm9qaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFR0lDdC81TTlHT01aZ2hUTWVkeE9HbHNSRHkwNEwwaXV0RThodUlYMG5VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDam1UMEFHbVlBTiszTGdjNG0zS1UvOE9vS2xabWIxamFGb3dyYkRBODJJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtHZy85RXpuL1o2RnZsaCt3NUh5Q2YvZUNvRnFZVnZFeWp4N2JiUGljR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFhSFBNdkNFR0lGQzd5NHBqWDFnNFMrTURHTU5GOVYwUXU3aVdGOFQ5Mk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0dIZWNZRnpPVzB3WVplUExDenV3M0svTGs0SUMveDBEZ0ZQWjlTTGIzST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRERwVG1ncC9GN1BVWHVEVW55YzVnTnZkTGJCVDBDWWFmV0wrSVRqM3ozWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJRUDBrTEtGL3drUndTQW1mcnp4cHlsTjF6VUxlbFRLL2tZclRmS1hMM0NSMHlLV0d4QnV0Z0FqOXNFYlNRcVZCMEprV1VRbDFCQ3VjdHByQnFob0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk5LCJhZHZTZWNyZXRLZXkiOiJrS0dQTFJrZUQzZHdpeTdKNTVPTFRhMDBDdG5XMnBrWGlIc0hOWmxUMWcwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxNDY1OTk2OThAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTFCNUI1QzkyODhCNThBMTFDNzAzQzFFODhCNkEwRUQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTg0MTg4Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE0NjU5OTY5OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyN0Q5MzdFNkNBNzEzQ0RGOTQ0REE5QzIwRkNBNEIwMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1ODQxODg3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI2V1otQk1VSlJTMjd1Sk1nMVBvMXpBIiwicGhvbmVJZCI6IjcwY2E0OWU3LWUzNTEtNDk5Ni1hZWEzLWI1NDU1YmMyNzA1ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4U0lBY3pBWjY2WVJXTmk4Qisra1pxUDEwbEU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOTZVQVRqL25Pd1JxdTZEenQwUkdVNUpjR3FzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQ4QTFNTkdYIiwibWUiOnsiaWQiOiIyMzQ4MTQ2NTk5Njk4OjRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQsO8w7HDsXkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05QdWhxQUVFTWZkdmNBR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjR6QUV5cU9TU1FUVXo1VG0yOUppVWVXdVhZUUU2T240SEhiemZyd2xYaUk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkM2TFdDd1BsTGI0bHBMNDAyMUFhbXdjajBzKzhGOUVZU2hWNm1QUTBDK0ptaHFWZ0RnTlI0MldkM2IyeFdTUDZiZ1pvOWVoeEUxaHJ2SjdVQzdyY0J3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJLdUw5TEZuUU9tbzBaNmtjK2NEanZ2Y0lCbUQ5ZFQ5NXVONllaYXFOejRyWmxEQjVMZUliMnBzUW5nODhWbGRIOEZlQVdhd0s5QXp3clBpUDBkZ0dCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNDY1OTk2OTg6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlTXdCTXFqa2trRTFNK1U1dHZTWWxIbHJsMkVCT2pwK0J4MjgzNjhKVjRpIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1ODQxODc2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5aUSJ9",
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

import acrcloud from "acrcloud";
import { downloadMediaMessage } from "@whiskeysockets/baileys";
import fs from "fs";

const acr = new acrcloud({
  host: "identify-eu-west-1.acrcloud.com",
  access_key: "6ab51323d0971429efbc32743c3b6e01",
  access_secret: "iFbOFUI9rVrQPf7WN5BzcpPnQoCTPJ3JdMkAgrU8",
});

const shazamCommand = async (m, Matrix) => {
  const body =
    m.message?.extendedTextMessage?.text ||
    m.message?.conversation ||
    m.message?.imageMessage?.caption ||
    m.message?.videoMessage?.caption ||
    "";

  const prefix = ".";
  const cmd = body.startsWith(prefix)
    ? body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";

  if (cmd !== "shazam") return;

  // React emoji when command is called
  await Matrix.sendMessage(m.from, { react: { text: "🎶", key: m.key } });

  const isMedia = m.message.audioMessage || m.message.videoMessage;

  if (!isMedia) {
    return await Matrix.sendMessage(
      m.from,
      { text: "❌ *Please reply to an audio or video message to identify it!*" },
      { quoted: m }
    );
  }

  const mediaBuffer = await downloadMediaMessage(m, "buffer");

  fs.writeFileSync("./temp_audio.mp3", mediaBuffer);

  acr
    .identify(fs.readFileSync("./temp_audio.mp3"))
    .then(async (result) => {
      fs.unlinkSync("./temp_audio.mp3");

      if (result.status.code === 0) {
        const metadata = result.metadata.music[0];
        const title = metadata.title;
        const artist = metadata.artists[0].name;
        const album = metadata.album ? metadata.album.name : "Unknown";
        const releaseDate = metadata.release_date || "Unknown";
        const genres = metadata.genres
          ? metadata.genres.map((g) => g.name).join(", ")
          : "N/A";

        await Matrix.sendMessage(
          m.from,
          {
            text: `🎵 *Track Identified!*\n━━━━━━━━━━━━━━━━━━━━━\n✨ *Title:* ${title}\n🎤 *Artist:* ${artist}\n💿 *Album:* ${album}\n📅 *Released:* ${releaseDate}\n🎧 *Genres:* ${genres}\n━━━━━━━━━━━━━━━━━━━━━`,
          },
          { quoted: m }
        );
      } else {
        await Matrix.sendMessage(
          m.from,
          { text: "❌ *Sorry, couldn't identify this track.*" },
          { quoted: m }
        );
      }
    })
    .catch(async (err) => {
      console.error("ACRCloud Error:", err);
      await Matrix.sendMessage(
        m.from,
        { text: "❌ *An error occurred while identifying the track.*" },
        { quoted: m }
      );
    });
};

export default shazamCommand;

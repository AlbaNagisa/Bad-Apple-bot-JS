const Dicord = require("discord.js");
const client = new Dicord.Client();
const extractFrames = require("ffmpeg-extract-frames");
const fs = require("fs");
var asciify = require("asciify-image");

client.on("message", async (message) => {
  if (message.content.toLocaleLowerCase().startsWith("!bad apple")) {
    try {
      var options = {
        fit: "box",
        width: 28,
        height: 20.5,
        color: false,
      };
      fs.readdirSync("frames");

      let img = "";
      let i = 0;

      message.channel.send("Patience ca arrive").then(async (msg) => {
        const intervalID = setInterval(() => {
          i++;
          img = `./frames/out-${i}.png`;

          asciify(img, options, function async(err, asciified) {
            msg.edit("", {
              embed: {
                title: i,
                description: "```" + asciified + "```",
                timestamp: new Date(),
              },
            });
            if (i >= 6571) {
              clearInterval(intervalID);
            }
            if (err) {
              console.log(err);
            }
          });
          console.log(i);
        }, 1500);
      });
    } catch {
      await fs.mkdirSync("frames");

      await extractFrames({
        input: "bad_apple.mp4",
        output: "./frames/out-%d.png",
      });
      message.channel.send("Toute les frames ont été extraites avec succès");
    }
  }
});
client.on("ready", (client) => {
  console.log("Je suis en ligne");
});
client.login("Your Token here");

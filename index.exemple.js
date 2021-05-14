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
        width: 30,
        height: 22.5,
        color: false,
      };
      fs.readdirSync("frames");

      let img = "";

      let counter = false;
      message.channel.send("Patience ca arrive").then(async (msg) => {
        for (let i = 1; i < 6572; i) {
          img = `./frames/out-${i}.png`;
          const attachment = new Dicord.MessageAttachment(img);
          if (!counter) {
            console.log("noice");
            i++;
            counter = true;
            console.log(counter);
          }
          if (counter) {
            setTimeout(() => {
              console.log("pourquoi pas");

              asciify(img, options, function async(err, asciified) {
                counter = false;
                msg.edit("", {
                  embed: {
                    title: i,
                    description: "```" + asciified + "```",
                    /* attachFiles: attachment,
                      image: { url: `attachment://${attachment.name}` }, */
                  },
                });
                if (err) {
                  console.log(err);
                }
              });
            }, 2500);
          }
        }
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
client.login("Your token");

/* ============================================================================================================================================================== /
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "ping Received");
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://seeds-discord-bot.glitch.me/`);
}, 280000);

*/

/* ============================================================================================================================================================== */
require('dotenv').config()
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const db = require("quick.db");

/* ============================================================================================================================================================== */

const config = require("./config.json");
bot.prefix = config.prefix;
bot.developers = config.developers;
bot.devPerms = config.devPerms;

/* ============================================================================================================================================================== */

function emoji(id) {
  return bot.emojis.get(id).toString();
}
/* ============================================================================================================================================================== */

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
    if (props.help.aliases) {
      props.help.aliases.forEach(alias => {
          bot.aliases.set(alias, props.help.name);
      });      
    }

  });
  console.log(`Loaded ${jsFiles.length} commands.`);
  bot.commandNum = jsFiles.length;
});

/* =======================================================================================================================================    */

bot.errMsg = message => {
  message.channel.send(
    "**Error 404: Please enter command properly. Syntax Error in command**"
  );
};
bot.permMsg = message => {
  message.channel.send("You do not have permission to do this command");
};

/* =======================================================================================================================================    */

String.prototype.capitalize = function(allWords) {
  if (allWords)
    return this.split(/ +/g)
      .map(str => str.charAt(0).toUpperCase() + str.toLowerCase().substring(1))
      .join(" ");
  else return this.toLowerCase().charAt() + this.toLowerCase(0).substring(1);
};

/* ============================================================================================================================================================== */

bot.on("message", message => {
  bot.guild = message.guild;
  const prefix = bot.prefix;
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  let args = message.content
      .substring(prefix.length)
      .trim()
      .split(/ +/g);
  let cmdstr = args[0].toLowerCase();
  let cmd = bot.commands.get(cmdstr);
  if (bot.aliases.has(cmdstr)) cmd = bot.commands.get(bot.aliases.get(cmdstr))

  if (cmd) cmd.run(bot, message, args);

});

/* ============================================================================================================================================================== */

bot.on("ready", () => {
  let readyembed = new Discord.MessageEmbed()
    .setTitle("Bot Refresh!")
    .setColor(`RANDOM`)
    .setFooter("Bot", bot.user.displayAvatarURL)
    .setTimestamp();
  bot.user.setActivity("Working", {
    type: "WATCHING"
  });
  bot.user.setStatus("Online");
});

bot.on("disconnect", function(event) {
  console.log("FAILED_TO_CONNECT");
});

/* ============================================================================================================================================================== */

bot.login(process.env.DISCORD_TOKEN);
console.log("Bot is Online!");

/* ============================================================================================================================================================== */

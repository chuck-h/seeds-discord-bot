const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send("1 second...").then(m => {
    let ping = m.createdTimestamp - message.createdTimestamp;
    let choices = ["Pong :ping_pong:"];
    let response = choices[Math.floor(Math.random() * choices.length)];

    m.edit(
      `${response}: __Bot Latency__: **${ping}**, __API Latency__: **${Math.round(
        bot.ping
      )}**`
    );
  });
};

module.exports.help = {
  name: "ping"
};

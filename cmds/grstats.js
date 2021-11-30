const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const { getBalance, getGratitudeStats, getGratzPotKp } = require("../seeds");

  const embed = new Discord.MessageEmbed();
  Promise.all([getBalance("gratz.seeds"), getGratitudeStats(), getGratzPotKp()]).then(
    ([bal, stats, potkp]) => {
      var usablebal = bal * potkp/100;
      embed.setColor("GREEN");
      embed.setAuthor("Gratitude round stats");
      embed.addField("Current round", stats.round_id);
      embed.addField("Number of acknowledges", stats.num_acks);
      embed.addField("Gratitude pot (SEEDS)", bal);
      embed.addField("Gratitude pot keep %", potkp);
      embed.addField("Usable pot", usablebal);
      message.channel.send(embed);
    }
  );  
};

module.exports.help = {
  name: "grstats",
  description: "Get user token balances"
};
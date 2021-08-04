const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const { getBalance, getGratitudeStats } = require("../seeds");

  const embed = new Discord.MessageEmbed();
  Promise.all([getBalance("gratz.seeds"), getGratitudeStats()]).then(
    ([bal, stats]) => {
      embed.addField("Current round", stats.round_id);
      embed.addField("SEEDS on round", bal);
      embed.addField("Number of gratitude transactions", stats.num_transfers);
      embed.addField("Number of acknowledges", stats.num_acks);
      embed.addField("Gratitude volume", stats.volume);
      embed.setColor("GREEN");
      embed.setAuthor("Gratitude round stats");
      message.channel.send(embed);
    }
  );  
};

module.exports.help = {
  name: "grstats",
  description: "Get user token balances"
};
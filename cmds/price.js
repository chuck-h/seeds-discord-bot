const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(args[1] == "help"){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("price", "Usage: price")

    message.channel.send(helpembxd);
    return;
  }
    
  const {
    getCurrentSEEDSPrice
  } = require("../seeds");
  
  const embed = new Discord.MessageEmbed();
  Promise.all([
    getCurrentSEEDSPrice(),
  ]).then(([prices]) => {
    embed.addField("SEEDS price per USD", prices.current_seeds_per_usd);
    embed.addField("SEEDS price in USD", (1/parseFloat(prices.current_seeds_per_usd)).toFixed(4));
    embed.addField("Remaining on sales round", prices.remaining / 10000);
    embed.setColor("GREEN");
    embed.setAuthor("Hypha Sale SEEDS Price");
    message.channel.send(embed);
  });    
  
};

module.exports.help = {
  name: "price",
  description: "Get current SEEDS price"
};
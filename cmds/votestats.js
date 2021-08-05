const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(args[1] == "help"){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("votestats", "Usage: votestats")

    message.channel.send(helpembxd);
    return;
  }
    
  const {
    getCurrentProposals,
    getCurrentSupport
  } = require("../seeds");
  
  const embed = new Discord.MessageEmbed();
  Promise.all([
    getCurrentProposals(),
    getCurrentSupport()
  ]).then(([props, support]) => {
    embed.setAuthor(`Current Voting Round Stats ${support.cycle}`);
    for (var i = 0; i < props.length; i++) {
      const title = props[i].title;
      const creator = props[i].creator;
      const quantity = props[i].quantity;
      const favour = props[i].favour;
      const against = props[i].against;
      const total = favour-against;
      const fund = props[i].fund === "gift.seeds" ? "Campaign": "Alliance" ;
      embed.addField(`${title} (${creator})`, `Value: ${quantity}, votes: +${favour}/-${against} (total: ${total})`);
    }
    embed.addField("Votes to pass (campaign)", support.campaigns);
    embed.addField("Votes to pass (alliance)", support.alliances);
    embed.setColor("GREEN");
    message.channel.send(embed);
  });    
  
};

module.exports.help = {
  name: "votestats",
  description: "Get current SEEDS voting status"
};
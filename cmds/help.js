const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var serverembed = new Discord.RichEmbed()
    .setTitle("Help Center")
    .setDescription(`
        I'm GratzBot, and I can aid you to interact with SEEDS Gratitude in many ways!
        
        * To pay someone with Seeds: \`\!pay <@User> <value> [memo]\`.
        * To check your token balances: \`\!balance [@User]\`.
        * To acknowledge gratitude tokens to someone: \`\!acknowledge <@User> [memo]\`.
        * Set someone's Seeds account: \`\!seedsacct [@User] <seedsacct>\`.
        * I can also show current gratitude round stats: \`\!grstats\`.
        
        Welcome to the SEEDS ecosystem!`)
    .setColor("GREEN")
    .setTimestamp(message.createdAt, true)
    .setFooter("GratzBot || 2021 JulioHolon");
  
  
  message.channel.send(serverembed);
};
module.exports.help = {
  name: "help",
  description: "Help on commands"
};

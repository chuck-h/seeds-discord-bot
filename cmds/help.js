const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var serverembed = new Discord.MessageEmbed()
    .setTitle("Help Center")
    .setDescription(`
        I'm GratzBot, and I can aid you to interact with SEEDS Gratitude in many ways!
        
        - (NEW!) To donate* Seeds to the global Gratitude Pot : \`\!donate <value>\`.
        - To check your (or someone's) token balances: \`\!balance [@User]\`. (Aliases: !bal)
        - To acknowledge* gratitude tokens to someone: \`\!acknowledge <@User> [memo]\`. (Aliases: !ack)
        - Set or check your (or someone's) Seeds account: \`\!seedsacct [@User] [seedsacct]\`.
        - I can also show current gratitude round stats: \`\!grstats\`.

      * **IMPORTANT**: Remember to validate the QR code I sent to you via private message so the action can be recorded on chain.

      SEEDS Ecosystem:
        - To check current Seeds price : \`\!price\`.
        - (NEW!) To check current SEEDS voting stats : \`\!votestats\`.
        - To pay* someone in Seeds tokens : \`\!pay <@User> <value> [memo]\`.
        
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

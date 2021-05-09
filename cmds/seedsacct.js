const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(args[1] == "help" || args.length < 2){
    let helpembxd = new Discord.RichEmbed()
    .setColor("#00ff00")
    .addField("seedsacct", "Usage: seedsacct [@user] [seedsaccount]")

    message.channel.send(helpembxd);
    return;
  }
  let sender = message.author;
  let target = args.length>2 ? message.mentions.users.first() : sender;
  var account = args.length>2 ? args[2] : args[1]
  
  if (account == "null") {
    db.delete(`seedsacct-${target.id}`)
    message.channel.send(`${target} account removed.`);
    return
  }
  
  db.set(`seedsacct-${target.id}`, account)
  
  message.channel.send(`${target} account is now ${account}`);
};

module.exports.help = {
  name: "seedsacct"
};

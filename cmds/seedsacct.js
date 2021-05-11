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
  
  var target
  var account
  
  if (args.length == 3) { // set someone´s account
    target = message.mentions.users.first();
    account = args[2]
  } else { // set my account
    target = message.author;
    account = args[1]
  }
    
  if (account == "null") {
    db.delete(`seedsacct-${target.id}`)
    bot.channels.get(process.env.GRATITUDE_CHANNEL_ID).send(`${target} account unset.`)
    message.channel.send(`${target} account unset.`);
    target.send("Your account has been unset.")
    return
  }
  
  db.set(`seedsacct-${target.id}`, account)
  bot.channels.get(process.env.GRATITUDE_CHANNEL_ID).send(`${target} account is now "${account}"`)
  message.channel.send(`${target} account is now "${account}"`)
  target.send(`Your account is now set as: "${account}"`)
};

module.exports.help = {
  name: "seedsacct"
};

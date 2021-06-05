const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(args.length == 1) { // check your account
    account = await db.fetch(`seedsacct-${message.author.id}`)
    if (account) {
      message.channel.send(`Your account is "${account}".`)
    } else {
      message.channel.send("Your account is not defined.")
    }
    return;
  }

  var target
  var account

  if (args.length == 2) {
    target = message.mentions.users.first();
    if (target) { // get someone´s account
      account = await db.fetch(`seedsacct-${target.id}`)
      if (account) {
        message.channel.send(`${target} account is "${account}".`)
      } else {
        message.channel.send("${target} account is not defined.")
      }
      return;
    } else { // setting your own account !seedsacct <someaccount>
      target = message.author;
      account = args[1]      
    }
  }

  if (args.length == 3) { // set someone´s account
    target = message.mentions.users.first();
    account = args[2]
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
  //message.channel.send(`${target} account is now "${account}"`)
  target.send(`Your account is now set as: "${account}"`)
};

module.exports.help = {
  name: "seedsacct"
};

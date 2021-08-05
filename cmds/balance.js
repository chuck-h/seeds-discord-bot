const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(args[1] == "help"){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("balance", "Usage: balance [user]")

    message.channel.send(helpembxd);
    return;
  } 
  let sender = message.author;
  
  var user = message.mentions.users.first()
  var account = null
  if (user) {
    account = await db.fetch(`seedsacct-${user.id}`)
    if (!account) {
      message.channel.send(`Account for ${user} is missing! Please setup using the *seedsacct* command.`)
      return
    }
  } else if (args[1]) {
    account = args[1]
  } else {
    account = await db.fetch(`seedsacct-${sender.id}`)
    if (!account) {
      message.channel.send(`Your SEEDS account is missing! Please setup using the *seedsacct* command.`)
      return
    }
  }

  const request = require("sync-request");
  const {
    getReceivedGratitude,
    getRemainingGratitude,
    getBalance,
    getAcks
  } = require("../seeds");

  const embed = new Discord.MessageEmbed();
  //https://github.com/cc32d9/eosio_light_api
  var res = request(
    "GET",
    `https://api.light.xeos.me/api/account/telos/${account}`,
    {
      headers: {
        "user-agent": "bot-user-agent"
      }
    }
  );
  res = JSON.parse(res.getBody("utf8"));
  Promise.all([
    getRemainingGratitude(account),
    getReceivedGratitude(account),
    getAcks(account)
  ]).then(([remaining, received, acks]) => {
    for (var i = 0; i < res.balances.length; i++) {
      embed.addField(res.balances[i].currency, res.balances[i].amount);
    }
    embed.addField("Gratitude to give", remaining);
    embed.addField("Gratitude received", received);
    embed.addField("Acks given", acks.length);
    embed.setColor("GREEN");
    embed.setAuthor("Token Balances");
    embed.setTitle(`Balances for ${account}`);
    message.author.send(embed);
  });    
  
};

module.exports.help = {
  name: "balance",
  description: "Get user token balances",
  aliases: ["bal"]
};
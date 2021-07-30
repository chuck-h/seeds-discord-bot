const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(args[1] == "help" || args.length < 3){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("Pay", "Usage: pay <to> <quantity> [memo]")

    message.channel.send(helpembxd);
    return;
  } 
  let sender = message.user;
  var recipient = args[1];
  var quantity = args[2];  
  var memo = args.length > 3 ? args.slice(3).join(" ") : "gratzbot payment";

  var user = message.mentions.users.first()
  var account = null
  if (user) {
    account = await db.fetch(`seedsacct-${user.id}`)
    if (!account) {
      message.channel.send(`Account for ${user} is missing! Please setup using the *seedsacct* command.`)
      return
    }
  } else {
    account = args[1]
  }

  
  const request = require("sync-request");

  var res = request(
    "GET",
    `https://api-esr.hypha.earth/invoice?to=${account}&quantity=${quantity}&memo=${memo}`,
    {
      headers: {
        "user-agent": "bot-user-agent"
      }
    }
  );
  res = JSON.parse(res.getBody("utf8"));

  const embed = new Discord.MessageEmbed();
  embed.addField(
    `Sending ${quantity} Seeds to ${account}.`,
    "Scan using SEEDS Wallet"
  );
  embed.setColor("GREEN");
  embed.setImage(res.qr);
  embed.setAuthor("Authorize Payment");
  embed.setTitle("Click to authorize from mobile");
  var link = "https://eosio.to/" + res.esr.slice(6);
  embed.setURL(link);
    
  message.author.send(embed);
};

module.exports.help = {
  name: "pay",
  description: "Pay user in SEEDS"
};
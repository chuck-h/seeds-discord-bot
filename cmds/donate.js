const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(args[1] == "help" || args.length < 2  ){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("Donate", "Usage: donate <quantity>")

    message.channel.send(helpembxd);
    return;
  } 
  let sender = message.user;
  var recipient = "gratz.seeds";
  var quantity = args[1];  
  var memo = "Gratitude global pot donation";
  
  const request = require("sync-request");

  var res = request(
    "GET",
    `https://api-esr.hypha.earth/invoice?to=${recipient}&quantity=${quantity}&memo=${memo}`,
    {
      headers: {
        "user-agent": "bot-user-agent"
      }
    }
  );
  res = JSON.parse(res.getBody("utf8"));

  const embed = new Discord.MessageEmbed();
  embed.addField(
    `Donating ${quantity} Seeds to ${recipient}.`,
    "Scan using SEEDS Wallet"
  );
  embed.setColor("GREEN");
  embed.setImage(res.qr);
  embed.setAuthor("Authorize Donation");
  embed.setTitle("Click to authorize from mobile");
  var link = "https://eosio.to/" + res.esr.slice(6);
  embed.setURL(link);
  
  const gratz_channel = message.guild.channels.cache.find(ch => ch.name.endsWith(process.env.GRATITUDE_CHANNEL_ID));
  if (gratz_channel) gratz_channel.send(`${sender} donates ${quantity} to the Global Gratitude Pot!!`)
  if (message.channel != gratz_channel) {
      message.channel.send(`${sender} donates ${quantity} to the Global Gratitude Pot!!`)
  }

  
  message.author.send(embed);
};

module.exports.help = {
  name: "donate",
  description: "Donate Seeds to the Global Gratitude Pot"
};
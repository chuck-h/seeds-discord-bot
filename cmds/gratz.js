const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(args[1] == "help" || args.length < 3){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("Acknowledge", "Usage: !gratz <@user> <quantity> <message>")

    message.channel.send(helpembxd);
    return;
  } 
  let sender = message.author;
  var recipient = args[1];
  var quantity = args[2];
  var memo = ""
  if (args.length > 3) {
    memo =  args.slice(3).join(" ");
  }

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

  var res = request("POST", `https://api-esr.hypha.earth/qr`, {
    headers: {
      "user-agent": "bot-user-agent"
    },
    json: {
      actions: [
        {
          account: "gratz.seeds",
          name: "give",
          authorization: [
            {
              actor: "............1",
              permission: "............2"
            }
          ],
          data: {
            from: "............1",
            to: account,
            quantity: parseFloat(quantity).toFixed(4) + " GRATZ",
            memo: memo
          }
        }
      ]
    }
  });
  res = JSON.parse(res.getBody("utf8"));

  const embed = new Discord.MessageEmbed();
  embed.addField(
    `Gifting ${quantity} GRATZ to ${account}.`,
    "Scan using your SEEDS Wallet"
  );
  embed.setColor("GREEN");
  embed.setImage(res.qr);
  embed.setAuthor("Authorize Gratitude");
  embed.setTitle("Click to authorize from mobile");
  var link = "https://eosio.to/" + res.esr.slice(6);
  embed.setURL(link);

  const gratch = message.guild.channels.find(ch => ch.name.endsWith('gratitude'));
  gratch.send(`${sender} gives ${quantity} GRATZ to ${recipient}(${account}) for "${memo}"`)
  if (message.channel != gratch) {
      message.channel.send(`${sender} gives ${quantity} GRATZ to ${recipient}(${account}) for "${memo}"`)
  }
  
  message.author.send(embed);
};

module.exports.help = {
  name: "gratz",
  description: "Give Gratitude Tokens to user"
};
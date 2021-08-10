const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(args[1] == "help" || args.length < 3){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("Acknowledge", "Usage: !acknowledge <@user> <message>")

    message.channel.send(helpembxd);
    return;
  } 
  let sender = message.author;
  var recipient = args[1];
  var memo = args.slice(2).join(" ")

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
          name: "acknowledge",
          authorization: [
            {
              actor: "............1",
              permission: "............2"
            }
          ],
          data: {
            from: "............1",
            to: account,
            memo: memo
          }
        }
      ]
    }
  });
  res = JSON.parse(res.getBody("utf8"));

  const embed = new Discord.MessageEmbed();
  var msg = memo ? `Acknowledging gratitude to ${account} for ${memo}` : `Acknowledging gratitude to ${account}`
  embed.addField(
    msg,
    "Scan using your SEEDS Wallet"
  );
  embed.setColor("GREEN");
  embed.setImage(res.qr);
  embed.setAuthor("Authorize Gratitude");
  embed.setTitle("Click to authorize from mobile");
  var link = "https://eosio.to/" + res.esr.slice(6);
  embed.setURL(link);

  const gratz_channel = message.guild.channels.cache.find(ch => ch.name.endsWith(process.env.GRATITUDE_CHANNEL_ID));
  
  if (gratz_channel) gratz_channel.send(`${sender} acknowledges ${recipient}(${account}) for "${memo}"`)
  if (message.channel != gratz_channel) {
      message.channel.send(`${sender} acknowledges ${recipient}(${account}) for "${memo}"`)
  }
  message.author.send(embed);
};

module.exports.help = {
  name: "acknowledge",
  description: "Acknowledge user for Gratitude Tokens",
  aliases: ["ack", "thanks"]
};
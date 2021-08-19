const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  let sender = message.user;

  const request = require("sync-request");

  var res = request(
    "GET",
    `https://app.joinseeds.com/api/passport/v2/user-metrices`,
    {
      headers: {
        "user-agent": "bot-user-agent"
      }
    }
  );
  res = JSON.parse(res.getBody("utf8"));
  
  let visitors = 0;
  let residents = 0;
  let citizens = 0;
  let total = 0;
   
  for (let i=0;i<res.length; i++) {
    if (res[i]._id === "citizen") {
      citizens = res[i].total;
    }
    if (res[i]._id === "resident") {
      residents = res[i].total;
    }
    if (res[i]._id === "visitor") {
      visitors = res[i].total;
    }
    total = citizens + residents + visitors
  }
  
  if (res.length > 0) {
    const embed = new Discord.MessageEmbed();
    embed.addField(
      "Visitors",
      `${visitors}`
    );
    embed.addField(
      "Residents",
      `${residents}`
    );
    embed.addField(
      "Citizens",
      `${citizens}`
    );
    embed.addField(
      "TOTAL",
      `${total}`
    );
    embed.setColor("GREEN");
    embed.setAuthor("SEEDS users count");
    message.channel.send(embed);    
  }
};

module.exports.help = {
  name: "users",
  description: "List users"
};
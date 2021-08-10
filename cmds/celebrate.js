const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
  if(args[1] == "help"){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("help", "Usage: celebrate")

    message.channel.send(helpembxd);
    return;
  }
  
  var size = 100
  if (args.length == 2) {
    size = args[1];
  }
  
  
  const request = require("sync-request");
  var res = request(
    "GET",
    `https://telos.caleos.io/v2/history/get_actions?account=gratz.seeds&filter=gratz.seeds%3Aacknowledge&skip=0&limit=500&sort=desc`
  );
  res = JSON.parse(res.getBody("utf8"));
  
  var pos = Math.floor(Math.random() * 10);
 
  
  var action = res.actions[pos] 
  var timestamp = action.timestamp
  const d = new Date(timestamp)
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  let hh = new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: false, timeZone: 'UTC' }).format(d);
  let mm = new Intl.DateTimeFormat('en', { minute: 'numeric' }).format(d);
  timestamp = `${da}-${mo}-${ye} ${hh.padStart(2, '0')}:${mm.padStart(2, '0')} UTC`
  var from = action.act.data.from
  var to = action.act.data.to
  var memo = action.act.data.memo

  const embed = new Discord.MessageEmbed()
  embed.setTitle(`${from} -> ${to}`);
  embed.addField("When:", timestamp)
  embed.addField("Message:", memo)
  embed.setColor("GREEN");

  message.channel.send(embed)

};

module.exports.help = {
  name: "celebrate",
  description: "Celebrate Gratitude!"
};
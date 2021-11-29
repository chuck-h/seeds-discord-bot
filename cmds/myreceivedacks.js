const { Discord, MessageAttachment } = require("discord.js");
const db = require("quick.db");


module.exports.run = async (bot, message, args) => {
  if(args[1] == "help"){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("help", "Usage: myreceivedacks")

    message.channel.send(helpembxd);
    return;
  }
  
  var size = 500
  if (args.length == 2) {
    size = args[1];
  }
  
  var account = await db.fetch(`seedsacct-${message.author.id}`)
  if (!account) {
    message.channel.send(`Your SEEDS account is missing! Please setup using the *!seedsacct* command.`)
    return
  }

  
  const request = require("sync-request");
  var res = request(
    "GET",
    `https://telos.caleos.io/v2/history/get_actions?account=gratz.seeds&filter=gratz.seeds%3Aacknowledge&skip=0&limit=${size}&sort=desc`
  );
  res = JSON.parse(res.getBody("utf8"));
   
  message.channel.send(`Alright, I will PM you the gratitude acks you received in the last ${size} messages.`)
  var count=0;
  for (var i = 0; i < res.actions.length; i++) {
    var action = res.actions[i] 
    var timestamp = res.actions[i].timestamp
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
    
    if (to === account) {
      message.author.send(`On ${timestamp}, from: ${from}: "${memo}"`);
      count++;
    }
    
  }
  message.author.send(`Total ${count} acks received.`);

  
};

module.exports.help = {
  name: "myreceivedacks",
  description: "Get memos from Gratitude"
};
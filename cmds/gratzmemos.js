const { Discord, MessageAttachment } = require("discord.js");


module.exports.run = async (bot, message, args) => {
  if(args[1] == "help"){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("help", "Usage: gratzmemos")

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
    `https://telos.caleos.io/v2/history/get_actions?account=gratz.seeds&filter=gratz.seeds%3Aacknowledge&skip=0&limit=${size}&sort=desc`
  );
  res = JSON.parse(res.getBody("utf8"));
   
  var buffer = "timestamp;from;to;memo\n"
  
  for (var i = 0; i < res.actions.length; i++) {
    var action = res.actions[i] 
    var timestamp = res.actions[i].timestamp
    var from = action.act.data.from
    var to = action.act.data.to
    var memo = action.act.data.memo
    
    buffer = buffer + `${timestamp};${from};${to};${memo}\n`
  }
  
  const fs = require('fs')
  fs.writeFileSync("./memos.csv", buffer)
  const file = fs.readFileSync('./memos.csv')
  const attachment = new MessageAttachment(file, 'memos.csv')
  message.channel.send("Here´s your memos", attachment)

};

module.exports.help = {
  name: "gratzmemos",
  description: "Get memos from Gratitude"
};
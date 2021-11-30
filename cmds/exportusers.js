const { Discord, MessageAttachment } = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(args[1] == "help"){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("help", "Usage: exportusers")

    message.channel.send(helpembxd);
    return;
  }

  var start = 0
  var end = 50
  if (args.length == 2) {
    end = args[1];
  }
  if (args.length == 3) {
    start = args[1];
    end = args[2];
  }  
  
  var buffer = "discord;seedsacct\n"
  var dball = db.all();
  if (end > dball.length) end = dball.length;
  for (var pg = start; pg < end; pg++) {
    var item = dball[pg]
    var acctname = item.data.replace(/['"]+/g, '')
    var user = await message.client.users.fetch(item.ID.substring(10))
    var tag = user.tag
    buffer = buffer + `${tag};${acctname}\n`    
  }
    
  const fs = require('fs')
  fs.writeFileSync("./users.csv", buffer)
  const file = fs.readFileSync('./users.csv')
  const attachment = new MessageAttachment(file, 'users.csv')
  message.channel.send("Here are all the users I know of from "+start+" to "+end, attachment)

};

module.exports.help = {
  name: "exportusers",
  description: "Get a list of users and their Discord names"
};
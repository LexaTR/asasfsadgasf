const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  message.channel.send(''+ message.author +', Pingim: **__'+ client.ping +'__**ms')
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pong"],
  permLevel: 0
}
exports.help = {
  name: "ping",
  description: "Ping komutudur.",
  usage: "!ping"
}

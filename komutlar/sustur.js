const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

var susturulmus = "SUSTURULDUN!" 

module.exports.run = async (bot, message, args) => {
  
  
if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(`**Yetkin Yok!**`);
  
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor("2D2D2D")
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('Uyarı !', `  ** !sustur ** Özel Mesajlarda Kullanılamaz`)
  return message.author.send(ozelmesajuyari); }
    let guild = message.guild
  let sebep = args.slice(1).join(' ');
  let banlog = guild.channels.find('name', 'boş-muhabbet');
  if (!banlog) return message.reply(`  **boş-muhabbet** isimli kanalı bulamıyorum.`);
  if (sebep.length < 1) return message.reply(`  Susturma sebebini yazmalısın.`);
  if (message.mentions.users.size < 1) return message.reply(`Susturulucak üye ismini yazmalısın.`).catch(console.error);

  let suskisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!suskisi) return message.reply(`:warning: | Doğru Kullanım Şekli: !sustur @üye ** 1sn/1dk/1sa/1g **`)
  let susrol = message.guild.roles.find(`name`, susturulmus);
  if(!susrol){
    try{
        susrol = await message.guild.createRole({
            name: susturulmus,
            color: "#FF0000",
            permissions:[]
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(susrol, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              CONNECT: false,
              SPEAK: false,
              READ_MESSAGE_HISTORY: false              
            });
          });
        }catch(e){
          console.log(e.stack);
        }
      }
      let suszaman = args[1]
      .replace(`sn`, `s`)
      .replace(`dk`, `m`)
      .replace(`sa`, `h`)
      .replace(`g`, `d`)
    
      if(!suszaman) return message.reply(`:warning: | Doğru Kullanım Şekli: k!sustur @üye ** 1sn/1dk/1sa/1g ** `)
    
      await(suskisi.addRole(susrol.id));
     const embed = new Discord.RichEmbed()
    .setColor("2D2D2D")
    .setTimestamp()
    .addField('Eylem:', 'Susturulma')
    .addField('Süre:', ` ${args[1]} `, true)
    .addField('Üye:', `<@${suskisi.id}>`)
    .addField('Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Sebep:', sebep);
  return guild.channels.get(banlog.id).sendEmbed(embed);
 

      setTimeout(() => {
        suskisi.removeRole(susrol.id);}, ms(suszaman));

};

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["mute"],
        permLevel: 0
      };
      
      exports.help = {
        name: "sustur",
        description: "",
        usage: ""
      };
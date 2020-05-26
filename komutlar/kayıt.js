const Discord = require('discord.js');
const db = require('quick.db');
const tag = "℟";


exports.run = async (client, message, args) => {

  const samet = await db.fetch(`kayıtk_${message.guild.id}`)
  if(samet == null) return message.channel.send('Kayıt Sistemi eklemek için <`!kayıt-rol @rol`/`!kayıt-kanal #kanal`/`!kayıt-log #kanal`> şeklinde Ayarlıya bilirsiniz. ');
  if (message.channel.id !== samet) return message.channel.send(`🔥 Her kullanıcı 1 kere kayıt olabilir 🔥`);
  if (samet == true) return; 
  if (samet == false) return message.channel.send(`Kayıt Sistemi Aktif değil`);
 /* client.on('',{
            
    message.send()
            }*/
  let user = message.member
  let guild = message.guild
 
  let isim = args[0]
  let yas = args[1]
  
  if (!isim) return message.channel.send(`İsmini girmelisin.`).then(msg => msg.delete(15000));
  if (!yas) return message.channel.send(`Yaşını girmelisin.`).then(msg => msg.delete(15000));

      const guildMember = message.member;
guildMember.addRole('713519866564444231');  
guildMember.removeRole('713807736697127012');  
message.delete();


  user.setNickname(`${tag} ${isim} | ${yas}`)
  user.addRole(db.fetch(`kayıt_${message.guild.id}`))
  message.author.send("Rexsahens Discord Sunucusunda Başarıyla kayıt oldun. İyi Oyunlar")
  message.guild.channels.get(db.fetch(`kayıtlog_${message.guild.id}`)).send(`🗒 ${message.author} Adlı kullanıcı Başarılı Şekilde Kayıt Oldu `);



  client.on("guildMemberAdd",async message => {
message.guild.channel.get(db.fetch(`kayıtk_${message.guild.id}`)).send("Bil olum");
  
});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kayıtol'],
  permLevel: 0,
  kategori: "kayıtolunmuyormq"
}

exports.help = {
  name: 'kayıt',
  description: "Sunucuya kayıtolmaya yarar",
  usage: 'kayıt <isim> <yaş>'
}
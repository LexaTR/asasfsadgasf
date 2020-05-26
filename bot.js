//consts (for glitch)
// GEREKLİ YERLER
const express = require("express");
const http = require("http");
const app = express();

app.get("/", (request, response) => {
  //console.log(Date.now() + " BOT Aktif.");
  //response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_NAME}.glitch.me`);
}, 1000 * 60 * 3);

// GEREKLİ YERLER
// -------------------------------------------------------------
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const ytdl = require('ytdl-core');
const source = require('gamedig');
const db = require('quick.db');
const moment = require('moment');
const bot = new Discord.Client();

const ayarlar = require('./ayarlar.json')
require('./util/eventLoader')(client);

const prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ^^');
  }
});

// ISIM \\
const isimloz = "Vlorion Bot | Müzik";
const oynuyorloz = "7/24 Müzik";
// ISIM \\

client.on(`message`, async message => {
if(message.content === `<@&${client.user.id}>`){
const embed = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setDescription(`Prefixim:\n${ayarlar.prefix}`)
message.channel.send(embed)}})

//////////////////
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

/// ONERI BOT.JS ///
client.on('message', message => { 
   if (message.channel.id !== '650419251403948045') return; 
   message.react('✅'); 
   message.react('❎') 
});

/// DESTEK BOT.JS ///

client.on('message', message => {
        const reason = message.content.split(" ").slice(1).join(" ");
  if (message.channel.name== '🔧・yardım-destek') { 
  if (!message.guild.roles.exists("name", "Yönetici")) return message.author.send(` ${message.guild.name} Adlı Sunucunda, \`Yönetici\` Adlı Bir Rol Olmadığı İçin, Hiçkimse Destek Talebi Açamıyor.`);
message.delete(1)
    if (message.guild.channels.exists("name", `destek-${message.author.id}`)) return message.author.send(`Açık Bir Destek Talebin Var.`);
message.delete(1)
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
message.delete(1)
          const category = message.guild.channels.find('name', 'DESTEKLER')
message.delete(1)    
          c.setParent(category.id)
      let role = message.guild.roles.find("name", "Yönetici");
      let role2 = message.guild.roles.find("name", "@everyone");
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });

      c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const embed = new Discord.RichEmbed()
     .setColor('#f19a0f')
      .setAuthor(`${client.user.username} | Destek Sistemi`)
      .addField(`Merhaba ${message.author.username}!`, `Destek Yetkilileri burada seninle ilgilenecektir. \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilirsin.`)
      .addField(`» Talep Konusu/Sebebi:`, `${message.content}`, true)
      .addField(`» Kullanıcı:`, `<@${message.author.id}>`, true)
      .setFooter(`${client.user.username} | Destek Sistemi`)
      .setTimestamp()
            c.send({
                embed: embed
            });
        }).catch(console.error); 
    
    }
   if (message.content.toLowerCase().startsWith(prefix + `kapat`)) {
    if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Yardım talebinizi yardım talebi kanalınızın dışındaki kanallarda kapatamazsınız.`);
     
    message.channel.send(`Destek talebinizi kapatmak istediğinize emin misiniz? \nOnaylamak için \`evet\` yazmalısın. _10 saniye_ içinde yazmazsan kapatma isteği iptal edilecektir.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Kapatma talebinin zamanı geçti yardım talebin kapatılmadı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

  
});

/// BOT DM ///
client.on("message", msg => {
  var dm = client.channels.get("708041025897234494"); //mesajın geleceği kanal idsi//
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.RichEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("BLUE")
      .setThumbnail(`${msg.author.avatarURL}`)
      .addField(":boy: Gönderen ", msg.author.tag)
      .addField(":id:  Gönderen ID :", msg.author.id)
      .addField(":globe_with_meridians: Gönderilen Mesaj", msg.content);
 
    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});

/// DESTEK BOT.JS ///

client.on('message', message => {
        const reason = message.content.split(" ").slice(1).join(" ");
  if (message.channel.name== '🔧・yardım-ve-destek') { 
  if (!message.guild.roles.exists("name", "V҉҉҉҉ Yönetim Ekibi")) return message.author.send(` ${message.guild.name} Adlı Sunucunda, \`V҉҉҉҉ Yönetim Ekibi\` Adlı Bir Rol Olmadığı İçin, Hiçkimse Destek Talebi Açamıyor.`);
message.delete(1)
    if (message.guild.channels.exists("name", `destek-${message.author.id}`)) return message.author.send(`Açık Bir Destek Talebin Var.`);
message.delete(1)
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
message.delete(1)
          const category = message.guild.channels.find('name', 'DESTEKLER')
message.delete(1)    
          c.setParent(category.id)
      let role = message.guild.roles.find("name", "V҉҉҉҉ Yönetim Ekibi");
      let role2 = message.guild.roles.find("name", "@everyone");
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });

      c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const embed = new Discord.RichEmbed()
     .setColor('#f19a0f')
      .setAuthor(`${client.user.username} | Destek Sistemi`)
      .addField(`Merhaba ${message.author.username}!`, `Destek Yetkilileri burada seninle ilgilenecektir. \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilirsin.`)
      .addField(`» Talep Konusu/Sebebi:`, `${message.content}`, true)
      .addField(`» Kullanıcı:`, `<@${message.author.id}>`, true)
      .setFooter(`${client.user.username} | Destek Sistemi`)
      .setTimestamp()
            c.send({
                embed: embed
            });
        }).catch(console.error); 
    
    }
   if (message.content.toLowerCase().startsWith(prefix + `kapat`)) {
    if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Yardım talebinizi yardım talebi kanalınızın dışındaki kanallarda kapatamazsınız.`);
     
    message.channel.send(`Destek talebinizi kapatmak istediğinize emin misiniz? \nOnaylamak için \`evet\` yazmalısın. _10 saniye_ içinde yazmazsan kapatma isteği iptal edilecektir.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Kapatma talebinin zamanı geçti yardım talebin kapatılmadı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

  
});

/// PANEL DENEME AQ ///
client.on("message", async (msg) => {
  let ever = msg.guild.roles.find(c => c.name === "@everyone")
	let sistem = await db.fetch(`panell_${msg.guild.id}`);
	if(sistem == "açık") {
		let kategori = msg.guild.channels.find(c => c.name.startsWith(msg.guild.name));
		if(!kategori) {
			msg.guild.createChannel(`${msg.guild.name} | Sunucu Paneli`, {
				type: 'category',
				permissionOverwrites: [{
					id: msg.guild.id,
					deny: ['CONNECT']
				}]
			}).then(parent => {
        setTimeout(async function() {
          let eo = msg.guild.roles.find(r => r.name == "@everyone")
          parent.overwritePermissions(eo, {
            CONNECT: false
          })
          setTimeout(async function() {
            parent.setPosition(0);
          })
          db.set(`panelParentID_${msg.guild.id}`, parent.id);
          let toplamUye = msg.guild.channels.find(c => c.name.startsWith('Toplam Üye •'));
          if(!toplamUye) {
            try {
              let s = msg.guild.memberCount;
              msg.guild.createChannel(`Toplam Üye • ${s}`, {
                type: 'voice'
              }).then(ch => {
                setTimeout(function() {
                  ch.overwritePermissions(ever, {
                    CONNECT: false
                  })
                  db.set(`toplamID_${msg.guild.id}`, ch.id)
                  ch.setParent(parent);
                  ch.setPosition(1);
                }, 120)
              })
            } catch (err) {

            }
          }
        let uyesayısı = msg.guild.channels.find(c => c.name.startsWith('Üye Sayısı •'));
        if(!uyesayısı) {
          try {
            let uyesayı = msg.guild.members.filter(m => !m.user.bot).size;
            msg.guild.createChannel(`Üye Sayısı • ${uyesayı}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone")
                setTimeout(function() {
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
                ch.setParent(parent);
                ch.setPosition(2);
                db.set(`uyeSayıID_${msg.guild.id}`, ch.id);
              }, 120)
            })
          } catch (err) {

          }
          let botsayı = msg.guild.members.filter(m => m.user.bot).size;
          try {
            msg.guild.createChannel(`Bot Sayısı • ${botsayı}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone")
              setTimeout(function() {
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
                ch.setParent(parent);
                ch.setPosition(3);
                db.set(`botSayıID_${msg.guild.id}`, ch.id);
              }, 120)
            })
          } catch (err) {

          }
          let onl = msg.guild.members.filter(m => m.presence.status != "offline" && !m.user.bot).size;
          try {
            msg.guild.createChannel(`Çevrimiçi Üye • ${onl}`, {
              type: 'voice'
            }).then(ch => {
              let ever = msg.guild.roles.find(role => role.name === "@everyone");
              setTimeout(function() {
                ch.setParent(parent);
                ch.setPosition(4);
                db.set(`onlSayıID_${msg.guild.id}`, ch.id);
                ch.overwritePermissions(ever, {
                  CONNECT: false
                })
              }, 15000)
          })
        } catch (err) {
          
        }
      }
        }, 50)
			})
		} else {
      let parent = msg.guild.channels.find(c => c.name == `${msg.guild.name} | Sunucu Paneli`)
      if(msg.content.includes('panel kapat')) return false;
      let toplamuye = msg.guild.channels.find(c => c.name.startsWith(`Toplam Üye •`));
      toplamuye.setParent(parent);
      toplamuye.setName(`Toplam Üye • ${msg.guild.memberCount}`);
      let uyesayı = msg.guild.channels.find(c => c.name.startsWith(`Üye Sayısı •`));
      uyesayı.setParent(parent);
      uyesayı.setName(`Üye Sayısı • ${msg.guild.members.filter(m => !m.user.bot).size}`);
      let botuye = msg.guild.channels.find(c => c.name.startsWith(`Bot Sayısı •`));
      botuye.setParent(parent);
      botuye.setName(`Bot Sayısı • ${msg.guild.members.filter(m => m.user.bot).size}`);
      let onl = msg.guild.channels.find(c => c.name.startsWith('Çevrimiçi Üye •'));
      onl.setParent(parent);
      onl.setName(`Çevrimiçi Üye • ${msg.guild.members.filter(m => m.presence.status != "offline" && !m.user.bot).size}`);
		}
	} else {

	}
})  


/// MÜZİK DENEME AQ ///
// KOMUTLAR \\
const yardımloz = "yardım";
const playloz = "müzik";
const skiploz = "geç";
const playingloz = "çalan";
const volumeloz = "ses";
const queueloz = "sıra";
const stoploz = "durdur";
const pauseloz = "duraklat";
const goloz = "devam";
// KOMUTLAR \\

//////////////////////////////////
////////////////////////
// Müzik Komutu // // API KODU DC DE //

const { GOOGLE_API_KEY } = require("./anahtarlar.json");
const YouTube = require("simple-youtube-api");
const queue = new Map();
const youtube = new YouTube(GOOGLE_API_KEY);

client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);

  if (command === `${playloz}`) {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            ":warning: | İlk olarak sesli bir kanala giriş yapmanız gerek."
          )
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(
            ":warning: | İlk olarak sesli bir kanala giriş yapmanız gerek."
          )
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(
            ":warning: | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız."
          )
      );
    }

if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`**✅ Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Müzik Seçim Listesi:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
**Lütfen 10 saniye içerisinde müzik seçimi yapınız yoksa seçiminiz iptal olucaktır. :warning: **
**1-10 arasındaki arama sonuçlarından birini seçmek için lütfen bir değer belirtin. :warning: **
					`);
          
          msg.delete(5000);
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.sendEmbed(
              new Discord.RichEmbed()
                .setColor("0x36393E")
                .setDescription(
                  ":warning: | **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**."
                )
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setColor("0x36393E")
              .setDescription(":( | **Aradım Fakat Hiç Bir Sonuç Çıkmadı**")
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === `${skiploz}`) {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(
              "<a:frograinbow:488978511474982933> | **Lütfen öncelikle sesli bir kanala katılınız**."
            )
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(
            "<a:frograinbow:488978511474982933> | **Hiç Bir Müzik Çalmamakta**"
          )
      );
    serverQueue.connection.dispatcher.end("**Müziği Geçtim!**");
    return undefined;
  } else if(command === `${yardımloz}`){
      msg.delete();
  const baslik = client.emojis.get('699733250947416085'); // Başlık Emojisinin ID'si Buraya
  const emoji = client.emojis.get('705027827707281428'); // Komutların Başına Gelcek ID Buraya
  
  const yardım = new Discord.RichEmbed()
.setDescription(`
:star2: **Müzik Komutları** :star2:

:fire: k!müzik <- Müziği Bulur Ve Çalar.

:fire: k!durdur <- Müziği Bitirir.

:fire: k!duraklat  <- Müziği Durdurur.

:fire: k!geç  <- Müzik Atlar Bi Sonraki Müzigi Açar.

:fire: k!ses  <- Ses Seviyesini Gösterir - Beta.
`,true);
  
  msg.channel.send(yardım);
} else if (command === `${stoploz}`) {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(
              "**:warning: | Lütfen öncelikle sesli bir kanala katılınız.**"
            )
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(":warning: **| Hiç Bir Müzik Çalmamakta**")
      );
    msg.channel.send(
      `:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`
    );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("**Müzik Bitti**");
    return undefined;
} else if (command === `${volumeloz}`) {
		if (!msg.member.voiceChannel) return msg.channel.send('**:mute: Bu komutu kullanabilmek için bir sesli odada olman gerekli.**');
		if (!serverQueue) return msg.channel.send(':x: **Hiç bir müzik çalmamakta.**');
		if (!args[1]) return msg.channel.send(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`:loud_sound: Ses seviyesi ayarlanıyor: **${args[1]}**`);

  } else if (command === `${playingloz}`) {
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(":warning: | **Çalan Müzik Bulunmamakta**")
          .setColor("RANDOM")
      );
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(`${isimloz} | Çalan`)
        .addField(
          "Başlık",
          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`,
          true
        )
        .addField(
          "Süre",
          `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`,
          true
        )
    );
  } else if (command === `${queue}`) {
    let index = 0;
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(":warning: | **Sırada Müzik Bulunmamakta**")
          .setColor("RANDOM")
      );
    return msg.channel
      .sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(`${isimloz} | Şarkı Kuyruğu`)
          .setDescription(
            `${serverQueue.songs
              .map(song => `**${++index} -** ${song.title}`)
              .join("\n")}`
          )
      )
      .addField("Şu anda çalınan: " + `${serverQueue.songs[0].title}`);
  } else if (command === `${pauseloz}`) {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("**:pause_button: Müzik Senin İçin Durduruldu!**")
          .setColor("RANDOM")
      );
    }
    return msg.channel.send(":warning: | **Çalan Müzik Bulunmamakta**");
  } else if (command === `${goloz}`) {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("**:arrow_forward: Müzik Senin İçin Devam Etmekte!**")
          .setColor("RANDOM")
      );
    }
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(":warning: ** | Çalan Müzik Bulunmamakta.**")
        .setColor("RANDOM")
    );
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    views: video.views
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(
        `:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
      );
      queue.delete(msg.guild.id);
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(
            `:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
          )
          .setColor("RANDOM")
      );
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(
          `:arrow_heading_up:  **${song.title}** Adlı Müzik Kuyruğa Eklendi!`
        )
        .setColor("RANDOM")
    );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === " :x:  | **Yayın Akış Hızı Yeterli Değil.**")
        console.log("Müzik Bitti.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.sendEmbed(
    new Discord.RichEmbed()
      .setTitle(
        `**${isimloz} | 🎙 Müzik Başladı**`,
        `https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`
      )
      .setThumbnail(
        `https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`
      )
      .addField("\nBaşlık", `[${song.title}](${song.url})`, true)
      .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
      .addField("Süre", `${song.durationm}:${song.durations}`, true)
      .setColor("RANDOM")
  );
}

//////////////////
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

/// DESTEK SONU AQ ///

client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`) 
          if (i == 'acik') {
              const reklam = ["discord.app", "discord.gg", "invite","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", "185.", "sikik", "amcık", "piç", "amk", "orospu", "oç", "sikerim", "ananı", "sülaleni",];                                                                       
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                   
                    let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setFooter('Lexa Coder  -|-  Reklam/Küfür engellendi.', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription("Lexa Coder Reklam sistemi, " + `***${msg.guild.name}***` + " adlı sunucunuzda reklam yakaladım.")
                    .addField('Reklamı yapan kişi', 'Kullanıcı: '+ msg.author.tag +'\nID: '+ msg.author.id, true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`${msg.author.tag}, Lexa'nın sunucularında reklam/küfür yasaktır !`).then(msg => msg.delete(5000));
                  }             
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
  });

let ehengel = JSON.parse(
  fs.readFileSync("./ayarlar/everhereengel.json", "utf8")
);
client.on("message", async function(msg) {
  if (!msg.guild) {
  } else {
    if (!ehengel[msg.guild.id]) {
    } else {
      if (ehengel[msg.guild.id].sistem == false) {
      } else if (ehengel[msg.guild.id].sistem == true) {
        if (msg.author.id == msg.guild.ownerID) {
        } else {
          if (msg.content.includes("@everyone")) {
            msg.delete();
            msg
              .reply("maalesef `everyone` atmana izin veremem!")
              .then(msj => msj.delete(3200));
          } else {
          }
          if (msg.content.includes("@here")) {
            msg.delete();
            msg
              .reply("maalesef `here` atmana izin veremem!")
              .then(msj => msj.delete(3200));
          } else {
          }
        }
      }
    }
  }
});

client.on("ready", async () => {
setInterval(() => {
const request = require('request');
let ip = '185.193.165.120'
let port = '27015'
let oyunid = 'csgo'
 require("request")(`http://oyunapi.net/api/${oyunid}/online/${ip}/${port}`, async function (err, resp, body) {
body = JSON.parse(body);
const kanal = `Online Kişi: ${body.Online}/${body.Maks}`
let codare = client.channels.get("714753521572118588") 
codare.setName(kanal);
 })
}, 15000)//https://www.convertworld.com/tr/zaman/milisaniye.html
})

client.on("ready", async () => {
setInterval(() => {
const request = require('request');
let ip = '185.193.165.120'
let port = '27015'
let oyunid = 'csgo'
 require("request")(`http://oyunapi.net/api/${oyunid}/map/${ip}/${port}`, async function (err, resp, body) {
body = JSON.parse(body);
const kanal = `Map : ${body.Map}`
let codare = client.channels.get("714753482195861524") 
codare.setName(kanal);
 })
}, 900000)//https://www.convertworld.com/tr/zaman/milisaniye.html
})

client.on("ready", async () => {
setInterval(() => {
const request = require('request');
let ip = '185.193.165.120'
let port = '27015'
let oyunid = 'csgo'
 require("request")(`http://oyunapi.net/api/${oyunid}/isim/${ip}/${port}`, async function (err, resp, body) {
body = JSON.parse(body);
const kanal = `${body.Sunucu_İsmi}`
let codare = client.channels.get("714753435878031391") 
codare.setName(kanal);
 })
}, 259200000)//https://www.convertworld.com/tr/zaman/milisaniye.html
})

client.on('guildMemberAdd', async(member) => {
if(member.guild.id != '461954489403047937') return
const kanal = `Son Üye • ${member.user.username}`
let channel = client.channels.get("714871608044683419") //KANAL İD
channel.setName(kanal);
});




client.login(ayarlar.token);
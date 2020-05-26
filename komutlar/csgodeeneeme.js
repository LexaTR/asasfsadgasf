const source = require('gamedig');
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  try {
   let host = 'jb.vlorion.com';
    let port = 27015;

    let data = await source.query({
      type: 'csgo',
      host: host,
      port: port
    });

    let stats = [
      {
        name: 'Server IP',
        value: `\`${host}:${port}\``,
        inline: true
      },
      {
        name: 'Oyuncular',
        value: `${data.players.length}/${data.maxplayers}`,
        inline: true
      },
      {
        name: 'Harita',
        value: data.map
      },
    ];

    if (data.players.length > 0) {
      let players = [];
      for (let i = 0; i < data.players.length; i++) {
        players.push(data.players[i].name);
      }
      stats.push(
        {
          name: 'Oyuncu',
          value: `\`\`\`http\n${players.join('\n')}\`\`\``,
          inline: true
        },
        {
          name: 'Katıl',
          value: `<steam://connect/${host}:${port}>`
        }
      );
    }

    let footer;
    if (data.password) {
      footer = {
        text: 'Gizli Sunucu',
        icon_url: ''
      };
    }

    message.channel.send({
      embed: {
        color: 0x4287f5,
        title: data.name,
        description: '[Counter-Strike: Global Offensive](https://store.steampowered.com/app/730/)',
        fields: stats,
        footer: footer
      }
    });
  }
  catch (e) {
    if (e.toString() === 'UDP Watchdog Timeout') {
      return message.reply('bilinmeyen ip. Lütfen doğru ip giriniz.')
    }
    throw e;
  }
};

exports.conf = {
  aliases: ["server", "csgo", "sunucu"],
  enabled: true,
  guildOnly: false,
permLevel: 0
};

exports.help = {
  name: 'ip',
  description: 'CSGO serveri hakkında istatistikleri öğrenirsiniz.',
  usage: 'ip'
};
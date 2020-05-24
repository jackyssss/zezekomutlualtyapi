const Discord = require('discord.js');

exports.run = async (client, message, args,) => {
  const useruser = "Komut "  + message.author.username + " tarafından çalıştırıldı";
  const userurl = message.author.avatarURL;
  const bayrak = ":flag_tr:";
  const ping = `${Math.round(client.ping)}ms`;

let embed = new Discord.RichEmbed()
.setTitle('Anlık Gecikme Süresi ')
.setColor("#00FF00")
.addField("Ping :", ping)
.addField("Lokasyon :", bayrak)
.setFooter(useruser, userurl)
.setTimestamp();

message.channel.send(embed);

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["zeze"],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Gecikme süresini gösterir.',
  usage: 'ping'
};
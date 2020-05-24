  const Discord = require('discord.js');
exports.run = function(client, message, args) {
    if(message.channel.id !== "kullanılacak kanal idsi")return message.channel.send(new Discord.RichEmbed() .setDescription(`<#kanal idsi> Burada yapabilirsin :x:`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("PURPLE")).then(m => m.delete(5000));
    let type = args.slice(0).join(' ');message.delete()

    if (type.length < 1)return message.channel.send(
new Discord.RichEmbed()
.setDescription('Kullanım: .sikayet <Şikayet>'));
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription('Şikayetiniz Bildirildi!')
message.channel.send(embed)
  message.react('emoji idsi sunucuda olan') 

const embed2 = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**${message.author.tag}** adlı kullanıcının Şikayeti:`)
.addField(`Kulanıcı Bilgileri`, `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\nKullanıcı Tagı: ${message.author.discriminator}`)
.addField("Şikayet", type)
.setThumbnail(message.author.avatarURL)
client.channels.get('şikayetlerinatılacağı kanal idi').send(embed2); // Kanal ID 
};
exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["şikayet"],
  permLevel: 0 
};
exports.help = {
  name: 'sikayet',
  description: 'Şikayet de bulunursunuz.',
  usage: 'sikayet <Şikayet>'
};
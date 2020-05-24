const Discord = require('discord.js');

exports.run = async (client, message, args) => {
const zeze = message;
if (!zeze.member.roles.has('kayıt sorumlusu idsi')&& !zeze.member.hasPermission('ADMINISTRATOR')) return zeze.channel.sendEmbed(new Discord.RichEmbed().setDescription(' <@&rolidsi> Rolüne Sahip Olman Gerekiyor ❌').setColor("Black")); 
  let member = message.mentions.members.first()
  if (!member) return message.channel.send('Bir üye etiketlemelisin kanka')
   let zezeexe = args[1]
  if (!zezeexe) return message.channel.send('Bir isim yazmalısın kanka')
   let subzero = args[2]
  if (!subzero) return message.channel.send('Bir isim yazmalısın kanka')
  zeze.react('✅')
  member.setNickname(`tag ${zezeexe} | ${subzero}`)
  const embed = new Discord.RichEmbed()
  .addField(`Kullanıcının Sunucu İçindeki Adı Değiştirildi.✅`, `Değiştirilen Kullanıcı : ${member.user} \n Düzenlenmiş Kullanıcı adı : \`**TAG** ${zezeexe}\``)
        .setFooter(`Subzero ${message.author.username} `, `https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif`)//buraya ellerseniz kod bozulur
.setThumbnail("BURAYA GÜZEL BİR GİF LİNKİ GİREBİLİRSİNİZ YA DA SİLİN ")
  message.channel.send(embed)

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['NİCK',"n","isim","yaş"],
  permLevel: 0
}
exports.help = {
  name: 'nick',
  description: "Birinin nickini değiştirir.",
  usage: 'nick <yeni nick>'
} 
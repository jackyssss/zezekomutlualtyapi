const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {

if (!message.member.roles.has('kayıt sorumlusu idsi')&& !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(' <@&rolidsi> Rolüne Sahip Olman Gerekiyor ❌').setColor("Black")); 
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bir Üye Etiketlemelisin').setColor("Black"));
  let zeze = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let subzero = message.guild.member(kullanıcı)
  message.react('✅')
  subzero.addRole('712538071102390283')
  const embed = new Discord.RichEmbed()
  .addField(`Kullanıcıya vip rolü verildi ✅`, `Verilen Kullanıcı : ${subzero.user}`)
        .setFooter(`Subzero ${message.author.username} `, `https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif`)//buraya ellerseniz kod bozulur
.setThumbnail("BURAYA GÜZEL BİR GİF LİNKİ GİREBİLİRSİNİZ YA DA SİLİN ")
  message.channel.send(embed)
}
exports.conf = {
  enabled: true, 
  guildOnly: true,
  aliases: [],
  kategori: "Yetkili Komutları",
  permLevel: 0
}
exports.help = {
  name: 'vip',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'kayıt isim yaş'
} 
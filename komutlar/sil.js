const Discord = require('discord.js');
exports.run = function(client, message, args) {
const zeze = message;
if (!zeze.member.roles.has('rol idsi')&& !zeze.member.hasPermission('ADMINISTRATOR')) return zeze.channel.sendEmbed(new Discord.RichEmbed().setDescription(' <@&rolidsi> Rolüne Sahip Olman Gerekiyor ❌').setColor("Black")); 
if(!args[0]) return message.channel.send(" Lütfen Silinicek Mesaj Miktarını Yazın.!").then(m => m.delete(5000));
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Toplamda **${args[0]}** Adet Mesajı Sildim. ✅`).setFooter(`Subzero ${message.author.username} `, `https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif`)//buraya ellerseniz kod bozulur
.setColor("black")).then(m => m.delete(5000));

  zeze.react('✅')
})
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['temizle','clear','sil'],
  permLevel: 0,
  kategori: "moderasyon"
};
exports.help = {
  komut: 'temizle',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle <silinicek mesaj sayısı>'
};
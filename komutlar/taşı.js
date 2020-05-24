const Discord = require('discord.js');
exports.run = async (client, message, args) => {
const zeze = message;
if (!zeze.member.roles.has('651361649785045051')&& !message.member.hasPermission('ADMINISTRATOR')) return zeze.channel.sendEmbed(new Discord.RichEmbed().setDescription(' <@&651361649785045051> Rolüne Sahip Olman Gerekiyor :loanding:').setColor("Black"));    if (!message.member.voiceChannel) { return message.channel.send("Ses kanalında olman lazım Dostum!"); }
  let kullanıcı = zeze.mentions.users.first()
  if (!kullanıcı) return zeze.channel.send("Etiketlemeyi unuttun aklın nerede senin :rage: ");
  let rol = zeze.mentions.roles.first()
  let member = zeze.guild.member(kullanıcı)
  if(!member.voiceChannel) return zeze.channel.send("Etiketlenen kullanıcı bir ses kanalında değil").then(m =>m.delete(5000))
  const subzero = zeze.member.voiceChannel.id;
if(!subzero) return
  member.setVoiceChannel(subzero);
   zeze.react('✅')
   const voiceChannel1 = zeze.member.voiceChannel.name;
  let embed= new Discord.RichEmbed()
    .setColor("#000000")
    .setDescription(zeze.author+" **Tarafından** "+kullanıcı+" **Kullanıcısı** `"+voiceChannel1+"`** Sesli Kanalına Çekildi **")
        .setFooter(`Subzero ${zeze.author.tag}`, `https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif`)//buraya ellerseniz kod bozulur
   .setTimestamp()  
    zeze.channel.send(embed).then(m =>m.delete(10000))
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
}
exports.help = {
  name: 'taşı',
  description: "prefix/taşı etiket bitti",
  usage: 'subzero üye taşıma kodu'
}
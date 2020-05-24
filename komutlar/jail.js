const Discord = require('discord.js');
const db = require("quick.db")////quick db modülünün indirilmesi gerekiyor ve db paketi indirielecek
exports.run = async (client, message, args) => {
  if(!message.member.roles.get("klllanabilecek rol idsi") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!").then(m => m.delete(5000));
  const zeze = message;
  let kullanıcı = message.mentions.users.first()
 if(!kullanıcı) return message.reply ("Lütfen Bir Kullanıcı Etiketleyiniz.").then(m => m.delete(5000));
  let user = zeze.mentions.users.first();
  let rol = zeze.mentions.roles.first()
  let member = zeze.guild.member(kullanıcı)
   let sebep = args.slice(1).join(" ")
      if(!sebep) return zeze.channel.send("Lütfen Bir Sebep Yazınız.").then(m => m.delete(5000));
  zeze.react('✅')
  zeze.guild.members.get(member.id).roles.forEach(r => {
zeze.guild.members.get(member.id).removeRole(r)
})
  member.addRole('712538072805277776')
db.set(`jail.${kullanıcı.id}` , 'kayıtlı')     
const kanal = message.guild.channels.find(c => c.id == "703889012099907614")//Log İstemiyorsan bu satırı sil.
    const embed1 = new Discord.RichEmbed() 
    .setDescription(`${kullanıcı} Kişisi **${sebep}** Sebebiyle Jaile Atıldı!`)
    .setColor("RED")
     .setFooter(`Subzero ${zeze.author.tag} tarafından istendi. `, `https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif`)//buraya ellerseniz kod bozulur
    .setTimestamp()
 let embed = new Discord.RichEmbed() 
  .setDescription(`${kullanıcı} Adlı Kişisine <@&cezalırolü idsi> Rolü Verildi! \n Sebeb: **${sebep}** `) 
  .setImage('')
     .setFooter(`Subzero ${zeze.author.tag} tarafından istendi. `, `https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif`)//buraya ellerseniz kod bozulur
  .setTimestamp()
  return zeze.channel.send(embed).then(kanal.send(embed1)).then(m => m.delete(5000000));
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ceza","cezalandır"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}
exports.help = {
  name: 'jail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: 'perfix+jail @etiket Sebeb'
}
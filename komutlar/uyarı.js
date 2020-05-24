const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
   if(message.author.id !== "kişi idsi") if(!message.member.roles.get("rol idsi")&&!message.member.roles.get("rol idsi")&& !message.member.hasPermission('ADMINISTRATOR'))  return message.channel.send(new Discord.RichEmbed() .setDescription(`Bu komutu Kullanmaya Hakkın yok :x:`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("RANDOM")).then(m => m.delete(5000));
    db.add(`uyarı1_${message.author.id}`,1)
  let kullanıcı = message.mentions.users.first()
 if(!kullanıcı) return message.channel.send(new Discord.RichEmbed() .setDescription(` Bir Kullanıcıyı Etiketlemelisin..`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("RANDOM")).then(m => m.delete(5000));
 let uyar = args[1]
  if(!uyar) return message.channel.send(new Discord.RichEmbed() .setDescription(`Bir Sebep Girmelisin..`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("RANDOM")).then(m => m.delete(5000));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let zezesebep = args.slice(1).join(" ")
  message.guild.members.get(member.id).roles.forEach(r => {
})
  member.addRole('710301495110795395')
     const kanal = message.guild.channels.find(c => c.id == "710301962851188762")////log kanalı idsi işte şu kişiye uyarı veridli filan yazacak
    const embed1 = new Discord.RichEmbed() 
    .setAuthor(message.author.tag ,message.author.avatarURL)
    .setDescription(`${kullanıcı} Kullanıcısı **${zezesebep}** Sebebiyle uyarı1 Verildi  `)
    .setColor("000000")
  .setFooter(`Subzero`)
    .setTimestamp()
  let embed = new Discord.RichEmbed() 
.setAuthor(message.author.tag ,message.author.avatarURL)
  .setDescription(`${kullanıcı} Kullanıcısı uyarı1 Verildi`) 
  .setImage('https://cdn.discordapp.com/attachments/690329201383047251/710302518961504299/55825e16bbb110c329265849709ea99b.png')
  .setFooter(`Subzero`)
  .setTimestamp()
  return message.channel.send(embed).then(kanal.send(embed1)).then(m => m.delete(5000));
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "Yetkili Komutları",
  permLevel: 0
}
exports.help = {
  name: 'uyarı1',
  description: "Uyarı 1 rolünü verir [subzero]",
  usage: 'etiket sebep'
} 
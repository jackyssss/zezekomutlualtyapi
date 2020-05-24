const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
 if (!message.member.roles.has('651425627928395807')&& !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(' Bu komutu kullanmak için <@&rolidsi> rolüne sahip olman gerekiyor').setColor("Black"));
  let kullanıcı = message.mentions.members.first()|| message.guild.members.get(args[0]);
  if (!kullanıcı) return message.channel.send(new Discord.RichEmbed() .setDescription(`Bir Kullanıcı Girin :x:`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("PURPLE")).then(m => m.delete(5000));
  let user = message.mentions.users.first();
  const zeze = message;
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let isim = args[1]
      if(!isim) return message.channel.send(new Discord.RichEmbed() .setDescription(`Bir İsim Giriniz :x:`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("PURPLE")).then(m => m.delete(5000));
  let yaş = args[2]
      if(!yaş) return message.channel.send(new Discord.RichEmbed() .setDescription(`Bir Yaş Giriniz :x:`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("PURPLE")).then(m => m.delete(5000));
  zeze.react('emoji idsi giriniz') 
 await member.removeRole ('712538072805277776') //// alınacak rol idsi
  await member.addRole('703849752911020162')////verilecek rol idsi
    await member.setNickname(`⭐ ${isim} | ${yaş}`)///en baştaki yıldız ısilip kendi tagınızı koyabilrisiniz

     const kanal = message.guild.channels.find(c => c.id == "703889012099907614")/////chat idsi
    const embed1 = new Discord.RichEmbed() 
    .setDescription(`${kullanıcı} adlı kullanıcı aramıza katıldı. Seninle beraber ${message.guild.memberCount} kişiyiz.`)
  .setDescription(`**Kullanıcı:** ${kullanıcı}\n\n**Verilen  Rol:** <@&erkek rolü idsi>`)                                                                                       
.setColor("000000")
    .setTimestamp()
  let embed = new Discord.RichEmbed() 
  .setAuthor(`${message.author.tag}` , message.author.avatarURL)
  .setColor('BLACK')
  .setTitle(`Rol Başarıyla Verildi ✅ \n`)
  .setThumbnail(zeze.avatarURL)
  .setDescription(`**Kullanıcı:** ${kullanıcı}\n\n**Yetki Veren:** <@${message.author.id}>`)                                                                                   
     .setFooter(`Subzero ${zeze.author.tag} tarafından istendi. `, `https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif`)//buraya ellerseniz kod bozulur
  .setTimestamp()
  return message.channel.send(embed).then(kanal.send(embed1))
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["e","E","Erkek","ERKEK"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'erkek',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'kayıt isim yaş'
} 
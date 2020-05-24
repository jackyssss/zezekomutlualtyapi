/// EMEĞE SAYGIDAN DOLAYI BU KODU PAYLAŞTIM BANA AİT DEĞİLDİR 
const Discord = require('discord.js')
const db = require("quick.db")
const ms = require('parse-ms');
exports.run = async (bot , message, args) => {
  if(!message.member.roles.get("rol_id") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok :onaysz:").then(msg => msg.delete(9000))
  let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  let sebep = args.slice(1).join(' ');
  let sChannel = bot.channels.get("log kanalı")////
  if(!kullanıcı) return message.reply("Lütfen Banlanacak Bir Kullanıcı Etiketleyiniz.").then(msg => msg.delete(9000))
  if(kullanıcı.hasPermission("ADMINISTRATOR")) return message.reply("Yöneticileri Banlayamazsın!").then(msg => msg.delete(9000))
  if(message.author.id === kullanıcı.user.id) return message.reply("Kendini Banlayamazsın!").then(msg => msg.delete(9000))
  if(!sebep) return message.reply("Lütfen Neden Banladığınızı Belirtiniz.").then(msg => msg.delete(9000))
  db.add(`BanSayısı_${message.author.id}`,1)        
  let sayı = await db.fetch(`BanSayısı_${message.author.id}`)
  let banlimiti = 3 ////3 ü artırabilirsiniz
  let banaralıgı = 300000 /// 30 dk da 1 ban atma hakkıvardır düşürebilrisiniz 0 yaparsanız beklettirmez
  var tarih = Date.now() 
  if(sayı === 1){
   db.set(`Banmatarihi_${message.author.id}`,tarih)   
  }
let ilkbantarihi =  await db.fetch(`Banmatarihi_${message.author.id}`)
if(sayı>banlimiti && tarih-ilkbantarihi <=banaralıgı) {
var süre = ms((ilkbantarihi+banaralıgı)-tarih)
 if(süre.minutes !== 0){
     message.channel.send("Ban Atabilemek İçin **"+süre.minutes+" Dakika** Beklemelisin.").then(m => m.delete(5000));
   return
   }
   if(süre.seconds !== 0){
     message.channel.send("Ban Atabilemek İçin **"+süre.seconds+" Saniye** Beklemelisin.").then(m => m.delete(5000));
     return
   }
  return
}
if(tarih-ilkbantarihi >=banaralıgı){
    db.set(`BanSayısı_${message.author.id}`,0)
    db.set(`Banmatarihi_${message.author.id}`,0) 
      let embed1 = new Discord.RichEmbed()
      .setColor('#f73737')
      .setDescription(kullanıcı.user+" Kullanıcısı "+message.guild.name+" Sunucusundan **"+sebep+"** Sebebiyle Yasaklandınız.")
      kullanıcı.send(embed1)
     let embed3 = new Discord.RichEmbed()
  .addField(`**Ban Bilgi**`, `**Banlayan : ** ${message.author}  (${message.author.id}) \n **Banlanan:** ${kullanıcı.user.tag}  (${kullanıcı.id})\n **Sebep :** ${sebep} `)
  .setImage('https://4.bp.blogspot.com/-WFUSBjSrCvY/XFZhj987nGI/AAAAAAAABCY/u63_7k26X34F9eJJ-GMFjGFYwM-QAmUIwCEwYBhgL/s1600/Smaug%2B5.gif')///ban gifi sunucudan
         .setFooter(`**Adalet Mülkün Temelidir.**`)
        setTimeout(() => {
      message.guild.member(kullanıcı).ban(`${message.author.tag} | ${sebep}`).catch(err => message.reply("Banlama Yetkim Yok. :onaysz:").then(m => m.delete(5000)))  
        },500)
          message.react('✅')
message.channel.send(embed3).then(m => m.delete(15000));
      db.add(`BanSayısı_${message.author.id}`,1)        
db.set(`Banmatarihi_${message.author.id}`,tarih)   
    let embed = new Discord.RichEmbed()
    .setColor('#f73737')
    .setDescription(kullanıcı.user+ " Kullanıcısı **"+sebep+"** Sebebiyle Yasaklanmıştır.")
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
    .setTimestamp()  
     if(!sChannel || sChannel === null) return
    sChannel.send(embed)
    return
 }
let embed1 = new Discord.RichEmbed()
   .setColor('RANDOM')
  .setDescription(kullanıcı.user+" Kullanıcısı "+message.guild.name+" Sunucusundan **"+sebep+"** Sebebiyle Yasaklandınız.")
   kullanıcı.send(embed1)
   setTimeout(() => {
  message.guild.member(kullanıcı).ban(`${message.author.tag} | ${sebep}`).catch(err => message.reply("Banlama Yetkim Yok.:onaysz:").then(m => m.delete(5000)))  
   },500)
     message.react('✅')
     let embed3 = new Discord.RichEmbed()
  .addField(`**Ban Bilgi**`, `**Banlayan : ** ${message.author}  (${message.author.id}) \n **Banlanan:** ${kullanıcı.user.tag} (${kullanıcı.id})\n **Sebep :** ${sebep} `)
  .setImage('https://4.bp.blogspot.com/-WFUSBjSrCvY/XFZhj987nGI/AAAAAAAABCY/u63_7k26X34F9eJJ-GMFjGFYwM-QAmUIwCEwYBhgL/s1600/Smaug%2B5.gif')///bangifi dmden atılan
    message.channel.send(embed3).then(m => m.delete(15000));
let embed = new Discord.RichEmbed()
   .setColor('#f73737')
   .setDescription(kullanıcı.user+ " Kullanıcısı **"+sebep+"** Sebebiyle Yasaklanmıştır.")
   .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
   .setTimestamp()  
   if(!sChannel || sChannel === null) return
  sChannel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ban"],
  permLevel: 0
};
exports.help = {
  name: 'ban',
  description: 'Kullanıcıyı sunucudan yasaklar.',
  usage: '&ban'
};
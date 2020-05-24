const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;
var subzero = "cezalı"; //VERİLECEK ROLÜN İSMİNİ YAZINIZ
module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.find("rolidsi", "rolidsi")&& !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(new Discord.RichEmbed().setTitle("Karantina").setColor("RED").setDescription("**<@&rolidsi> yetkin yoksa bu işlemi gerçekleştiremezsin**. "));
  let zezeexe = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!zezeexe) return message.reply(`Bir Kullanıcı etiketlemelisin `);
  let muterol = message.guild.roles.find(`name`, subzero);
  if (!muterol) {
    try {
      muterol = await message.guild.createRole({
        name: subzero,
        color: "#000000",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
    .replace(`s`, `s`)
    .replace(`m`, `m`)
    .replace(`h`, `h`)
    .replace(`d`, `d`);
  if (!mutezaman) return message.reply(`Doğru bi zaman gir`);
let guild = message.guild;
let reason = args.slice(2).join(" ");
  const member = message.guild.member(zezeexe);
  if (reason.length < 1)
    return message.channel.send(new Discord.RichEmbed().setTitle("• Mute").setColor("RED").setDescription("** Mute sebebini girermisin.** "));
  if (message.mentions.users.size < 1)
    return message.channel.send(new Discord.RichEmbed().setTitle("• Mute").setColor("RED").setDescription("** Mute atılacak kişiyi etiketlemen gerek.** ")).catch(console.error);
  if (member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(new Discord.RichEmbed().setTitle("• Mute").setColor("RED").setDescription("** Yöneticisi olan birini muteleyemem. ** ")).then(msg => {msg.delete(9000), message.delete(9000);
    });
  await zezeexe.addRole(muterol.id);
  message.react("a:tik:656136819766984755");
  message.channel.send(new Discord.RichEmbed().setTitle(``,new Discord.RichEmbed).setTitle("• Mute ").setColor("AQUA").setDescription(`<@${zezeexe.id}> kullanıcısı __**"${args[1]}"**__ süresi boyunca __${reason}__ sebebiyle **Mutelendi**. `));
zezeexe.send(new Discord.RichEmbed().setTitle("• Mute ").setColor("AQUA").setDescription(`**☾ Astralis** adlı Sunucuda __**"${args[1]}"**__ süresi boyunca __${reason}__ sebebiyle **"Mutelendiniz"**  `));
  
  const zeze = message.guild.channels.find(c => c.id === "703889012099907614");///mute atınca log atacağı kanal
  let modlog = new Discord.RichEmbed()
    .setColor("RED")
    .setTitle(" Mute Log")
    .setDescription(`<@${zezeexe.id}> adlı kişi Mutelendi :venom: \n Muteleyen Yetkili: **${message.author.username}#${message.author.discriminator}** \n Sebebi : **"${reason}"** \n Zamanı : __**"${args[1]}"**__ `)
    .setFooter(`☾ Astralis`);
  zeze.send(modlog);
setTimeout(function() {
    zezeexe.removeRole(muterol.id);
    zezeexe.send(`☾ Astralis adlı sunucudaki **"Mute"** Süreniz sona ermiştir. :venom:`);
    const zeze = message.guild.channels.find(c => c.id === "703889012099907614");///mütesi açılınca açıldığına dair bildirim gidecek kanal
    let modlog = new Discord.RichEmbed()
      .setColor("RED")
       .setTitle(" Mute Log")
      .setDescription(`<@${zezeexe.id}> adlı Kullanıcının "Mute" süresi doldu :venom:`)
        .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`);
    zeze.send(modlog);
  }, ms(mutezaman));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sustur"],
  permLevel: 0
};
exports.help = {
  name: "mute",
    usage: "mute <@kullanıcı> <30s/10m/1h/1d saniye, dakika, saat, gün "  
};
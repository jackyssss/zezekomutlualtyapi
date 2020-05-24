const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
let subzero1 = message.guild.members.filter(m=>m._roles.indexOf("tag rolü idsi")!==-1).size
const subzero = message;
  const voiceChannels = subzero.guild.channels.filter(c => c.type === 'voice');
    let sayı = 0;
    for (const [id, voiceChannel] of voiceChannels) sayı += voiceChannel.members.size;
  const arvelosembed = new Discord.RichEmbed()
  .setColor("black")
  .setAuthor('Bilgi', `${subzero.author.displayAvatarURL}`)
        .addField(` Ses kanallarında ${sayı} kişi bulunmaktadır.:white_check_mark:`, `Sunucuda ${subzero.guild.memberCount} kişi bulunmaktadır. :white_check_mark: \nSunucunun Tagında ${subzero1} Kişi Bulunmaktadır :white_check_mark: `) 
        .setTimestamp()
.setThumbnail("BURAYA GÜZEL BİR GİF LİNKİ GİREBİLİRSİNİZ YA DA SİLİN ")
     .setFooter(`Subzero ${subzero.author.tag} tarafından istendi. `, `https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif`)//buraya ellerseniz kod bozulur
  message.channel.sendEmbed(arvelosembed)
  subzero.react("✅")}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = { 
  name: 'say',
  description: 'Sunucu istatistiklerini gösterir.',
  usage: 'prefix+say'
};
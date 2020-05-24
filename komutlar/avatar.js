const Discord = require('discord.js');
exports.run = (client, message, args) => {
     
let zeze = message.mentions.users.first();
let sender = "";
const subzero = message;

if (message.channel.guild.member(subzero.author).nickname == null) {
  sender = subzero.author.username;
} else {
  sender = subzero.channel.guild.member(subzero.author).nickname;
}
if (zeze != null || zeze != undefined) {
  var name = zeze.username + "'s ";
  if (zeze.username.endsWith("s")) {
    name = zeze.username + "' ";
 }
  const avatar = new Discord.RichEmbed()
  .setAuthor(zeze.username, zeze.avatarURL)
  .setColor(0x3)
  .setImage(zeze.avatarURL)
  .setThumbnail("https://cdn.discordapp.com/avatars/653203998156914709/a_cf5eae0d3334c694dfb81a56743334f0.gif")
     .setFooter(`Subzero ${subzero.author.tag} tarafından istendi. `, `https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif`)//buraya ellerseniz kod bozulur
  subzero.channel.sendEmbed(avatar);
  return;
} else {
  const avatarEmbedYou = new Discord.RichEmbed()
  .setAuthor(sender, subzero.author.avatarURL)
  .setColor(0x3)
  .setImage(subzero.author.avatarURL)
  .setThumbnail("https://cdn.discordapp.com/avatars/653203998156914709/a_cf5eae0d3334c694dfb81a56743334f0.gif")
     .setFooter(`Subzero ${subzero.author.tag} tarafından istendi. `, `https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif`)//buraya ellerseniz kod bozulur
  subzero.channel.sendEmbed(avatarEmbedYou);
  return;}
subzero.channel.sendMessage("Bir daha dener misin");};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['AVATAR', 'pp',"av"],
  kategori: "AVATAR KOMUTLARI",
  permLevel: 0
};
exports.help = {
  name: 'avatar',
  description: 'sunucuda bulunan kişinin ppsini gösterir birini etiketlemez iseniz sizinkini gösterir',
  usage: '/pp etiket ya da etiketsiz'
};
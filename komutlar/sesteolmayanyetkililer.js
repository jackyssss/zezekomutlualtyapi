const Discord = require("discord.js")
exports.run = async (client, message, args) => {
let bot = client;
let msg = message;
if (!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) return;
if(message.channel.id !== "kullanılabilecek kanal idsi ")return message.channel.send(new Discord.RichEmbed() .setDescription(`<#709128840949006366> Burada yapabilirsin :x:`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("PURPLE")).then(m => m.delete(5000));
client.guilds.get("sunucu idsi").roles.get("yetkili rol bir rol uşuturun bütün yetkililere verin").members.forEach(async (x) => {
if (!x.voiceChannel){
client.channels.get("logu atacağı kanal").send(`Herhangi Bir Sesli Kanallarında Olmayan Yetkililer: ${x}`).catch(console.error);
} else {
return;
}
}).catch(console.error);
}
exports.conf = {
permLevel: 0,
guildOnly: false,
enabled: true,
aliases: []
}
exports.help = {
name: "ss"
}
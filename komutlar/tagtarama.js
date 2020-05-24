const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
exports.run = (client, message, args) => {
     if(message.author.id !== "653203998156914709")//lpöıtı kullanabilecek kişi
        return message.channel.send('<@653203998156914709> Komutu kullanmaya çalışan birisi var.')
  const tag = args.slice(0).join(' ');
if(!tag) return message.reply(`:warning: Bir Tag Girmelisiniz Örnek Kullanım; \n \`${ayarlar.prefix}tag-taraması ƈα\``)
  const memberss = message.guild.members.filter(member => member.user.username.includes(tag));
    const embed = new Discord.RichEmbed()
        .addField(`Kullanıcı Adında ${tag} Tagı Olan Kullanıcılar`, memberss.map(member => `${member} = ${member.user.username}`).join("\n") || `Kimsenin kullanıcı Adında \`${tag}\` Tagı Bulunmuyor.`)
        .setColor("RANDOM")
    message.channel.send({embed})
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['tagver',],
    permLevel: 0
}
exports.help = {
    name: 'tagtaramasıyap',
    description: 'Sunucudaki kullanıcılrın adında belirttiğiniz tag varsa rol verir',
    usage: 'tagver <tag> @rol /// örnek kullanım .tagver ⚝ @family rolü '
}

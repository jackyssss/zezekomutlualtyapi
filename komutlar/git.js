const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const filter = m => m.content.includes('discord');
module.exports.run = async (client, message, args) => {
const zeze = message;
const subzero = (reaction, user) => {
    return ['✅'].includes(reaction.emoji.name) && user.id === zeze.mentions.users.first().id;
}
if (!zeze.mentions.users.first()) return;
zeze.mentions.users.first().send(`Merhaba ${zeze.mentions.users.first().username}, ${zeze.author} Yanına gelmek istiyor kabul ediyor musun?\n*Unutma, 10 saniye içerisinde tike basmazsan istek iptal edilecek.*`).then(async (asd) => {
    await asd.react("✅");
    asd.awaitReactions(subzero, {
        max: 1,
        time: 10000,
        errors: ['time']
    }).then(async(c) => {
        if (!zeze.guild.member(zeze.mentions.users.first()).voiceChannel){
            zeze.author.send(`Kişi isteğini onayladı fakat herhangi bir odada yok, bir odaya girip tekrar istek gönder.`);
            zeze.mentions.users.first().send(`Herhangi bir odada olmadığın için onay başarısız.`);
            return;
        }
        await zeze.member.setVoiceChannel(zeze.guild.member(zeze.mentions.users.first()).voiceChannelID);
        asd.delete();
    }).catch(async(e) =>{
        await asd.delete();
        zeze.author.send(`${zeze.mentions.users.first().username} isteğini onaylamadı.`).then(hehe=>{hehe.delete(120000)});
    })
})
zeze.channel.send(`Merhaba ${zeze.mentions.users.first().username}, ${zeze.author} Yanına gelmek istiyor kabul ediyor musun?\n*Unutma, 10 saniye içerisinde tike basmazsan istek iptal edilecek.*`).then(async (asd) => {
    await asd.react("✅");
    asd.awaitReactions(subzero, {
        max: 1,
        time: 10000,
        errors: ['time']
    }).then(async(c) => {
        if (!zeze.guild.member(zeze.mentions.users.first()).voiceChannel){
            zeze.channel.send(`Etiketlediğiniz kişi hiçbir oda da bulunmamaktadır.`);
            zeze.mentions.users.first().send(`Bir odaya girer misin?`);
            return;
        }
        await zeze.member.setVoiceChannel(zeze.guild.member(zeze.mentions.users.first()).voiceChannelID);
        asd.delete();
    }).catch(async(e) =>{
        await asd.delete();
        zeze.author.send(`${zeze.mentions.users.first().username} TÜh seni istemiyorlar galiba , ya da aktif değil görmedi üzülme sakın.`).then(hehe=>{hehe.delete(120000)});
    })
})

}
 module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "admin",
  permLevel: 0
};
module.exports.help = {
  name: 'git',
  description: '',
  usage: 'prefix+git etiket'
}

const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
   if(message.author.id !== "653203998156914709")///kodu kullanabilecek kişi
        return message.channel.send('<@653203998156914709> Komutu kullanmaya çalışan birisi var.')
  if (!args[0]) return message.reply(`Yapılacak işlemi belirtmelisin!\n\`${this.help.usage}\``);
  let sayaçç = db.get(`sayaçç.${message.guild.id}`);
  if (args[0] === "sıfırla") {
    if (!sayaçç) return message.reply('Sayaç zaten ayarlanmamış!');
    db.delete(`sayaçç.${message.guild.id}`);
    message.reply('Başarıyla sayaç sıfırlandı!');
    return;
  };
  
  let kanal = message.mentions.channels.first();
  let sayi = args[1];
  if (!kanal ) return message.reply(`Sayacı düzgün ayarlamalısın!\nDoğru Kullanım: \`${this.help.usage}\``);
  if (sayi < message.guild.memberCount) return message.reply(`Girdiğin sayaç hedefi, sunucunun toplam üyesinden düşük! (${message.guild.memberCount})`);
  db.set(`sayaçç.${message.guild.id}`, {kanal: kanal.id, sayi: Number(sayi)});
  message.reply(`Başarıyla sayaç kanalı  ${kanal} olarak`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'çıkan', 
  description: 'Sayım yapar.',
  usage: 'sayaç #kanal / #kanal sıfırla ',
  kategori: 'yetkili'  
};
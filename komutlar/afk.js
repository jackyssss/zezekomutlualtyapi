const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (bot , message, args) => {
  
  let zeze = args.slice(0).join(' ') 
     let goldsaw = message.mentions.roles.first()

  if(zeze.toLowerCase().includes(".com") || zeze.toLowerCase().includes("youtube.com") || zeze.toLowerCase().includes("discord.gg")|| zeze.includes("http") || zeze.includes(goldsaw) ||zeze.includes("@here") || zeze.includes("@everyone")) return  [message.delete(10),message.reply("**Link veya Rol GİREMEZSİN**").then(msg => msg.delete(9000))]
  if(!zeze) zeze= "Şu an afkyım, en kısa sürede geri döneceğim.";
      setTimeout(function(){

  db.set(`afk_${message.author.id}, ${message.guild.id}`, zeze)
  
      },500)
  message.reply(`**${zeze}** nedeniyle afk oldunuz.`).then(msg => msg.delete(9000))
  if(!message.member.nickname) return message.member.setNickname("[AFK] " + message.member.user.username)
  message.member.setNickname(message.member.nickname+"[AFK] ").catch(err => console.log(err));
    
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'afk',
  description: 'AFK olursunuz. (Birisi sizi etiketlediğinde AFK olduğunuzu söyler.)',
  usage: 'afk <sebep>'
};
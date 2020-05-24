const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
const subzero = message;
  subzero.channel.send('**Tagımız** : **TAG**  ').then(m=>m.delete(10000)) }   
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'tag',
  description: 'Tagımızı Gösterir',
  usage: 'tag'
};
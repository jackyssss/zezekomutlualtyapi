const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send()
  let rol = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(rol => rol.name === args[0]);
  if (!rol) return message.channel.send()
   const embed = new Discord.RichEmbed()
        .setColor(rol.hexColor)
        .setFooter(`Subzero`)
   
   
   message.guild.members.forEach(u => {
u.addRole(rol)
   })
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['herkeserolver'],
    permLevel: 0
}

exports.help = {
    name: 'herkeserolver',
    description: 'Seçili rolü herkese verir.',
    usage: 'herkeserolver'
}
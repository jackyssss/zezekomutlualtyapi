const express = require('express');
const app = express();
const http = require('http');
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
var prefix = ayarlar.prefix;
require('./util/eventLoader')(client);
// GEREKLİ YERLER kurcalamayın

// -------------------------------------------------------------

app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);

//------------------------------------------------------------------

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
 
  // KOMUT TANIMI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);

  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

// PERM LEVELLER 

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

//

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
///////////// buranın üstüyle işiniz yok/////

///////////////////////////////////////////////////////////////////////////////////////////
//GİRER GİRMEZ DM DEN MESAJ ATIMA//
client.on("guildMemberAdd", member => {
  let embed1 = new Discord.RichEmbed()
    .setAuthor(`özelden gidecek emsajı yazınızzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz embedsiz için embedi silin bitti`)
    .setImage(
      "https://cdn.discordapp.com/attachments/693539816847048755/704698799179825162/f5261bc883840c1b7e35016749df2ce6.gif"///gif koyunuz
    )
    .setColor("PURPLE")
    .setDescription(
      `Sunucumuza Hoş Geldin Gif Sunucumuzada Girmeyi Unutma \nhttps://discord.gg/mfms2Jm`
    );
  member.send(embed1);
});
//////////////////////////////////////////
//girer girmez rol verme//
client.on("guildMemberAdd", async member => {
  await member.addRole("kayıtsız rolü"); /// kayıtsız rolü idssi ya da hangi rolü vermesini istiyrsanız
  member.setNickname("İsim | Yaş");
}); // örnek ✮ isim ' Yaş'
//----------------------------------------------------------------------------------
//Otoa tag verme//
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let zezeexe = "tagınızı giriceksiniz"; //tagınız
    let subzero1 = "sunucu idsi"; //sunucu ID
    let zeze = "kanalll idsi şu kişi tagı aldı çıkardı falan log atacak"; //log kanal id
    let subzero = "tag alınca verilecek rol idsi"; // rol ID
    if (
      newUser.username.includes(zezeexe) &&
      !client.guilds
        .get(subzero1)
        .members.get(newUser.id)
        .roles.has(subzero)
    ) {
      client.channels
        .get(zeze)
        .send(
          `${newUser} Ailemize  ${zezeexe} tagı alarak yeni bir kişi katıldı. <@&${subzero}> rolünü kazandı!`
        );
      client.guilds
        .get(subzero1)
        .members.get(newUser.id)
        .addRole(subzero);
    }
    if (
      !newUser.username.includes(zezeexe) &&
      client.guilds
        .get(subzero1)
        .members.get(newUser.id)
        .roles.has(subzero)
    ) {
      client.guilds
        .get(subzero1)
        .members.get(newUser.id)
        .removeRole(subzero);
      client.channels
        .get(zeze)
        .send(
          `${newUser} Ailemizden biri ${zezeexe} Tagı saldıı için <@&${subzero}> rolünü kaybetti.`
        );
    }
  }
});
////////////////////////////////////////
///afk
client.on("message",async message => {
    let zeze = message
   if (zeze.author.bot || zeze.channel.type === "dm") return;
    var afklar =await db.fetch(`afk_${zeze.author.id}, ${zeze.guild.id}`)
if(afklar){
    db.delete(`afk_${zeze.author.id}, ${zeze.guild.id}`)
    zeze.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
       try{
    let takma_ad = zeze.member.nickname.replace("[AFK] ", "")
    zeze.member.setNickname(takma_ad).catch(err => console.log(err));
       }catch(err){   
 console.log(err.zeze)
  }
  }
  var kullanıcı = zeze.mentions.users.first()
  if(!kullanıcı) return
   var sebep = await db.fetch(`afk_${kullanıcı.id}, ${zeze.guild.id}`)
  if(await db.fetch(`afk_${zeze.mentions.users.first().id}, ${zeze.guild.id}`)){
  zeze.channel.send(`${zeze.mentions.users.first()} Kullanıcısı Şu Anda Afk.\nAfk Sebebi: **${sebep}**`).then(m=>m.delete(15000))
  }
})
/////////////////////////////////
//odaya sokma //
client.on("ready", async message => {
  const channel = client.channels.get("712523583502417970");
  if (!channel) return console.error("Kanal 'ID' girilmemiş.");
  channel
    .join()
    .then(connection => {
      console.log("Başarıyla bağlanıldı.");
    })
    .catch(e => {
      console.error(e);
    });
});
////////////////////////////////////
///cezalı kodunun devamı çık gir yapsa bile cezalı düşer
client.on("guildMemberAdd", async member => {
  let zeze = await db.fetch(`jail.${member.id}`);
  let goldsaw = member

  if (zeze == "kayıtlı") {
    await goldsaw.removeRole("alınacak rol"); //alıncak roller sırayla
    await goldsaw.addRole("verilecek rol idsi"); //cezalı rol ıd
    let kanal = client.channels.get("kanal idsi"); //log kanal ıd.
    kanal.send(
      `${member} adlı kullanıcı sunucuya katıldı jailde kayıtlı oldugu için yeniden jaile atım.`
    ); //log'a isim
    goldsaw.send(
      `Oncelikle sunucumuza hoşgeldiniz sen onceden jailde oldugun için seni yeniden jaile atmak zorunda kaldım.`
    ); //kişiye yollanıcak mesaj.
  }
});
/////////////////////////////////////////////////////
///Welcome Mesajı///
client.on("guildMemberAdd", async member => {
  var zeze = member.guild.members.size.toString().replace(/ /g, "     ");
  var goldsaw = zeze.match(/([0-9])/g);
  zeze = zeze.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (goldsaw) {
    
    zeze = zeze.replace(/([0-9])/g, d => {
      return {
        "1": "<a:11:712568577474953287>", /// 0 den 9 a kadar emojilerin hepsinin sunucuda olması lazım
        "2": "<a:22:712568567953883186>",
        "3": "<a:33:712568575621201970>",
        "4": "<a:44:712568576514719805>",
        "5": "<a:55:712568576770572369>",
        "6": "<a:66:712568576619315260>",
        "7": "<a:77:712568577819017216>",
        "8": "<a:88:712568577995046912>",
        "9": "<a:99:712568576728367155>",
        "0": "<a:00:712568577181352016>"
      }[d];
    });
  }
  try {
    
    let embed = new Discord.RichEmbed();
    const kullanıcıadı = member.user.username.replace(/\W/g, "");
    await client.channels
      .get("703889012099907614") ////kanal girmeniz gerkeiyor
      .send(
        `:kitap~1: Sunucumuza Hoşgeldin  **${member}** 
:yldz: Seninle beraber ${zeze}  Kişiyiz !!
\n:loading: Kaydının Yapılması İçin Sesli Odaya Gelip Ses Vermen Gerekli. <@&666425273516032045> \n 
:ykleniyor2: **Hesap:** ${
          new Date().getTime() - member.user.createdAt.getTime() <
          45 * 24 * 60 * 60 * 1000
            ? "**Tehlikeli** "
            : "**Güvenli** "
        }
\n:yeil: <@&666419436747620365> Rolündeki Yetkililer Seninle İlgilenecektir.`,

        new Discord.Attachment(
          "https://cdn.discordapp.com/attachments/703889012099907614/712527095443488896/giphy_5.gif" /// gifi değiştirirsiniz
        )
      );
  } catch (err) {
    console.log(err);
  }
});
/////////////////////////
////istatistik emojili///
client.on("ready", (Subzero) => {
  setInterval(async (Subzero) => {
    let kanal = client.guilds.get('sunucu idsi').channels.get('kanal idsi');
    let mesaj = await kanal.fetchMessage('mesaj idsi');///mesajı botun atması lazım bota 1 mesaj attırtırsınız
    let embed = new Discord.RichEmbed().setTitle('Sunucu Güncel İstatistik').setFooter(mesaj.guild.name, mesaj.guild.iconURL).setThumbnail(mesaj.guild.iconURL)
    embed.setDescription(`<a:registerr:713339878305169419>Toplam Üye: ${mesaj.guild.memberCount.toString().split("").map(x => ["<a:say0:701824450441511004>", 
        "<a:say1:701824456078917663>",//sayıları değiştiririsiniz
        "<a:say2:701824457085419540>",
        "<a:say3:701824459627036753>",
        "<a:say4:701824459077582957>",
        "<a:say5:701824459295686665>",
        "<a:say6:701824459488624761>",
        "<a:say7:701824459547607130>",
        "<a:say8:701824459149017201>",
        "<a:say9:701824459450876013>"][parseInt(x)]).join("")}\n\n<a:registerr:713339878305169419>Yetkili Sayısı ${mesaj.guild.roles.get('700432753044488223').members.size.toString().split("").map(x => ["<a:say0:701824450441511004>", 
        "<a:say1:701824456078917663>",
        "<a:say2:701824457085419540>",
        "<a:say3:701824459627036753>",
        "<a:say4:701824459077582957>",
        "<a:say5:701824459295686665>",
        "<a:say6:701824459488624761>",
        "<a:say7:701824459547607130>",
        "<a:say8:701824459149017201>",
        "<a:say9:701824459450876013>"][parseInt(x)]).join("")}\n\n<a:registerr:713339878305169419>Aktif Üye: ${mesaj.guild.members.filter(uye => uye.presence.status !== "offline").size.toString().split("").map(x => ["<a:say0:701824450441511004>", 
        "<a:say1:701824456078917663>",
        "<a:say2:701824457085419540>",
        "<a:say3:701824459627036753>",
        "<a:say4:701824459077582957>",
        "<a:say5:701824459295686665>",
        "<a:say6:701824459488624761>",
        "<a:say7:701824459547607130>",
        "<a:say8:701824459149017201>",
        "<a:say9:701824459450876013>"][parseInt(x)]).join("")}\n\n<a:registerr:713339878305169419>Çevrimdışı Üye: ${mesaj.guild.members.filter(uye => uye.presence.status === "offline").size.toString().split("").map(x => ["<a:say0:701824450441511004>", 
        "<a:say1:701824456078917663>",
        "<a:say2:701824457085419540>",
        "<a:say3:701824459627036753>",
        "<a:say4:701824459077582957>",
        "<a:say5:701824459295686665>",
        "<a:say6:701824459488624761>",
        "<a:say7:701824459547607130>",
        "<a:say8:701824459149017201>",
        "<a:say9:701824459450876013>"][parseInt(x)]).join("")}`)
.setImage( "https://media.discordapp.net/attachments/693539816847048755/704698799179825162/f5261bc883840c1b7e35016749df2ce6.gif")//gifi değiştirirsiniz
    mesaj.edit(embed);
  }, 5000);
});
////////////////////////////
///bota cevap verdirtime
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  if (
    message.content.toLowerCase() === "sa" ||
    message.content.toLowerCase() === "sea" ||
    message.content.toLowerCase() === "selamün aleyküm" ||
    message.content.toLowerCase() === "selamun aleykum"
  ) {
    message
      .reply("Aleyküm Selam  Hoşgeldin <a:yavas:710272895967952917>")
      .then(m => m.delete(10000));
  }
  if (message.content === "tag") {
    message.channel.send("Tagımız : ੨");
    message.react("710273105775427634").then(m => m.delete(5000));
  }
  
});
///////////////////////////////
/// küfür koruma 
client.on("message", message => {
       const kufur = ["orospu","amık","Oç","0ç","yavşak","y3a3rram","a.m.k","A.M.K","or1spu","anan1 s1k1m","orospu evladı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","ağzına sıçim","ağzına sıçayım","ağzına s","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amcıklar","amq","amındaki","amnskm","ananı","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","bitch","yarrak","cibiliyetini","bokbok","bombok","dallama","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","porno","sikiş","s1kerim","puşt","sakso","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym"];
    if (kufur.some(word => message.content.includes(word)) ) {
                 //  bu kısmı açarsaniz yöneticilere küfür izni verirsiniz     if (!message.member.hasPermission("ADMINISTRATOR")) 
       message.channel.send(new Discord.RichEmbed() .setDescription(`✋ ${message.author}, Lütfen küfür etme !!`).setAuthor(message.author.tag ,message.author.avatarURL).setColor("BLACK")).then(m => m.delete(3000));
      message.delete()
      
    }
  
});

//////////////////////
//REKLAM KORUMA//
client.on("message",async message => {
   if (message.channel.type === "dm") return;
   if (message.author.id === "635485774820671519") return; // bot idsi ya da kullanıcı idsi girerseniz o kişi reklam atabilir link atan botun idsin igiriniz buraya
 if(message.channel.id==="654324008413822986") return //kanal idsi girerseniz o kanalda reklam serbest olur
 

 // if (message.channel.id === "612620863887376405") return;

  if(message.author.bot && message.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g)){
    message.delete(80)
    message.reply("Reklam yapmak yasak!!  <@&rol idsi> biri reklam yaptı ").then(m => m.delete(1000*60*5))
  }
if(message.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g)&& !message.member.hasPermission('ADMINISTRATOR')) {
  
 message.delete(80)
    message.reply("Reklam yapmak yasak!!  <@&rol idsi> biri reklam yaptı ").then(m => m.delete(1000*60*5))
}
})

client.on("messageUpdate", function(oldMessage, newMessage){
  if(newMessage.author.bot || newMessage.channel.type === "dm") return;
     if (newMessage.author.id === "653208421566513166") return;
if (newMessage.channel.id === "612620863887376405") return;
   if(newMessage.author.bot && newMessage.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) &&!newMessage.member.hasPermission('ADMINISTRATOR')){
    newMessage.delete(80)
    newMessage.reply("Reklam yapmak yasak!!  <@&rol idsi> biri reklam yaptı").then(m => m.delete(1000*60*1));
  }
if(!newMessage.member.hasPermission('ADMINISTRATOR') && newMessage.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g)) {
  
 newMessage.delete(80)
    newMessage.reply("Reklam yapmak yasak!!  <@&rol idsi> biri reklam yaptı").then(m => m.delete(1000*60*1));
}
});
////////////////////////////////////////
///SUNUCU PANEL KOMUTLAR panel.js'nindevamı
client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"));
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"));
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"));
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > sunucupaneli) {
      await db.set(`sunucupanel_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try {
      if(toplamuye) { toplamuye.setName(`Toplam Üye • ${member.guild.memberCount}`) }
      if(toplamaktif) { toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`) }
      if(botlar) { botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`) }
      if(rekoraktif) { rekoraktif.setName(`Rekor Aktiflik • ${sunucupaneli}`) }
   } catch(e) { };
  }
});
client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"));
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"));
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"));
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > sunucupaneli) {
      await db.set(`sunucupanel_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try {
      if(toplamuye) {
toplamuye.setName(`Toplam Üye • ${member.guild.memberCount}`) }
      if(toplamaktif) { toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`) }
      if(botlar) { botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`) }
      if(rekoraktif) { rekoraktif.setName(`Rekor Aktiflik • ${sunucupaneli}`) }
   } catch(e) { };
  }
});
/////////////////////// 
///BOTA ÖZELDEN GÖNDERİLEN MESAJ
client.on("message", message => {
    const dmchannel = client.channels.find("name", "kanal ismi");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});
//////////////
/// düzenlenmiş mesaj
client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let channel = newMessage.guild.channels.find(c => c.id === "kanal idsi id yi sili  name yazıp kanal ismi de girebilrisiinz")
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content, true)
  .addField("Yeni Mesaj", newMessage.content, true)
  .addField("Kanal Adı", newMessage.channel.name, true)
  .setThumbnail(newMessage.author.avatarURL)
  .setFooter(`Bilgilendirme   saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  channel.send({embed:embed})
});
///////
///silinen mesajlar
client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  
  if (message.author.bot) return;
  
  var user = message.author;
  
  let sChannel2 = message.guild.channels.find(c => c.name === "kanal ismi ")
  const embed = new Discord.RichEmbed()
  .setColor("RED")
  .setAuthor(`Mesaj silindi.`, message.author.avatarURL)
  .addField("Kullanıcı Tag", message.author.tag, true)
  .addField("Kanal Adı", message.channel.name, true)
  .addField("Silinen Mesaj", "" + message.content + "")
  .setThumbnail(message.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel2.send(embed);
  
});
///////////////////////// sayaçççç
client.on("guildMemberAdd", async member => {
  let sayac = db.get(`sayac.${member.guild.id}`);
  if (!sayac) return;
  let kanal = client.channels.get(sayac.kanal);
  if (!kanal) return db.delete(`sayac.${member.guild.id}`);
  kanal.send(`${member}sunucuya katıldı! Sunucu şu an **${member.guild.memberCount}** kişi. **${sayac.sayi}** kişi olmamıza **${sayac.sayi - member.guild.memberCount}** kişi kaldı!`);
  
  if (member.guild.memberCount >= sayac.sayi) {
    kanal.send(`Sunucu, sayaç hedefine ulaştı!`);
    db.delete(`sayac.${member.guild.id}`);
  };
});

client.on("guildMemberRemove", async member => {
  let sayaçç = db.get(`sayaçç.${member.guild.id}`);
  if (!sayaçç) return;
  let kanal = client.channels.get(sayaçç.kanal);
  if (!kanal) return db.delete(`sayac.${member.guild.id}`);
  kanal.send(`${member} sunucudan ayrıldı! Sunucu şu an **${member.guild.memberCount}** kişi kaldı.!`);
});
//////////////////////caps koruma
 client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 20) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`${msg.author}, Caps kapatır mısın lütfen. :atlas_onaytik2:`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

client.login(ayarlar.token); // BU YAZI  HER ZAMAN EN ALTA KALACAK ŞEKİLDE ÇALIŞIN

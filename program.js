require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.DISCORD_TOKEN;


bot.on('ready', function () {
  console.log("Count Bot connecté");
  
})

function C_Chan(serv,nom) {
    serv.createChannel(nom, "voice", [
        {
            id: serv.defaultRole.id,
            deny: ['CONNECT'],
        },
    ]).then(channel => {

    }).catch(console.error);
}

bot.on('message', msg => {
    if(msg.member.hasPermission("ADMINISTRATOR")) {
        if(msg.content.includes(bot.user.id) && msg.content.includes("config")) {
            var cbot = 0;
            var cint = 0;
            msg.guild.members.forEach(m => {
                if(m.user.bot) {
                    cbot++;
                } else {
                    cint++;
                }
            });
            var compteurMembers = "Members Count : " + cint;
            var compteurBot = "Bots Count : " + cbot;
            var channelStatM = msg.guild.channels.find("name", compteurMembers);
            var channelStatB = msg.guild.channels.find("name", compteurBot);
            if(channelStatM === null) {
                C_Chan(msg.guild, compteurMembers);
            } else {
                channelStatM.setName("Members Count : " + cint);
            }

            if(channelStatB === null) {
                C_Chan(msg.guild, compteurBot);
            } else {
                channelStatB.setName("Bots Count : " + cbot);
            }
        }
    }
})

bot.on('guildMemberAdd', gm => {
    var cint = 0;
    var cbot = 0;
    gm.guild.members.forEach(m => {
        if(m.user.bot) {
            cbot++;
        } else {
            cint++;
        }
        
    });

    if(gm.user.bot) {
        var oldCBot = cbot - 1;
        var compteurbot = "Bots Count : " + oldCBot;
        gm.guild.channels.find("name", compteurbot).setName("Bots Count : " + cbot);
    } else {
        var oldCMember = cint - 1;
        var compteurMember = "Members Count : " + oldCMember;
        gm.guild.channels.find("name", compteurMember).setName("Members Count : " + cint);
    }
})

bot.on('guildMemberRemove', gm => {
    var cint = 0;
    var cbot = 0;
    gm.guild.members.forEach(m => {
        if(m.user.bot) {
            cbot++;
        } else {
            cint++;
        }
    });

    if(gm.user.bot) {
        var oldCBot = cbot + 1;
        var compteurbot = "Bots Count : " + oldCBot;
        gm.guild.channels.find("name", compteurbot).setName("Bots Count : " + cbot);
    } else {
        var oldCMember = cint + 1;
        var compteurMember = "Members Count : " + oldCMember;
        gm.guild.channels.find("name", compteurMember).setName("Members Count : " + cint);
    }
})

bot.login(token);
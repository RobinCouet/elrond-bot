const axios = require('axios');
const db = require('../models');
const Discord = require('discord.js');

module.exports = {
    run: async function(message, args, client) {
        const discordId = message.author.id;
        let member;
        let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${discordId}/${message.author.avatar}.png?size=4096`);
        let mention = args[0];
        
        if (!mention) {
            embed.setDescription('Merci de tagger quelqu\'un ')
            .addFields(
                { name: 'Commande : ', value: '!balance @username' },
            );
            message.channel.send(embed);
            
            return;
        }

        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            member = client.users.cache.get(mention);
        }

        user = await db.users.findOne({ where: {discordId: mention} });

        embed = embed.setAuthor(member.username, `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=4096`)
        if (user == undefined) {
            embed.setDescription('Cet utilisateur n\'a pas de profil ');
            message.channel.send(embed);
                
            return;
        }

        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=elrond-erd-2&vs_currencies=USD,EUR').then((result) => {
            embed.setDescription(`${member.username} possede actuellement : `)
                .addFields(
                    { name: '¤ Elrond Gold', value: user.balance + ' EGLD' },
                    { name: '$ USD', value: (result.data['elrond-erd-2'].usd * user.balance).toLocaleString('fr-FR', {maximumFractionDigits:2}) + ' $', inline: true },
                    { name: '€ EUR', value: (result.data['elrond-erd-2'].eur * user.balance).toLocaleString('fr-FR', {maximumFractionDigits:2}) + ' €', inline: true },
                )
                .setTimestamp();
            message.channel.send(embed);
        });
    },
    name: 'balance'
}
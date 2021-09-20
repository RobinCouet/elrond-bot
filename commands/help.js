const axios = require('axios');
const db = require('../models');
const Discord = require('discord.js');

module.exports = {
    run: async function(message, args, client) {
        const discordId = message.author.id;
        let user;

        let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${discordId}/${message.author.avatar}.png?size=4096`);
        
        embed.setDescription(`Voici les commandes disponible : `)
            .addFields(
                { name: '!prix', value: 'Affiche le prix courrant' },
                { name: '!add [montant]', value: 'Ajoute à votre profil le montant indiqué' },
                { name: '!remove [montant]', value: 'Retire le montant indiqué à votre profil' },
                { name: '!profil', value: 'Affiche votre profil avec votre montant en EGLD avec l\'équivalent EUR et USD' },
                { name: '!balance @username', value: 'Affiche le profil de l\'utilisateur taggé si il existe' },
            )
            .setTimestamp();
        message.channel.send(embed);
    },
    name: 'help'
}
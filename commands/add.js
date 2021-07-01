const axios = require('axios');
const db = require('../models');
const Discord = require('discord.js');

module.exports = {
    run: async function(message, args, client) {
        const discordId = message.author.id;
        let user;
        let amount = args[0] ?? '';
        amount = parseFloat(amount.replace(',', '.'));

        let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${discordId}/${message.author.avatar}.png?size=4096`);
        
        if (args.length != 1 || isNaN(amount)) {
            embed.setDescription('Merci d\'indiquer la quantité ')
            .addFields(
                { name: 'Commande : ', value: '!add [quantité]' },
            );
            message.channel.send(embed);
            
            return;
        }

        user = await db.users.findOne({ where: {discordId} });

        if (user == undefined) {
            user = await db.users.create({
                discordId,
                firstName: message.author.username,
                avatar: message.author.avatar,
                balance: 0
            });
        }
        user.balance += amount;
        user.save();

        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=elrond-erd-2&vs_currencies=USD,EUR').then((result) => {
            embed.setDescription(`Vous possedez actuellement : `)
                .addFields(
                    { name: '¤ Elrond Gold', value: user.balance + ' EGLD' },
                    { name: '$ USD', value: (result.data['elrond-erd-2'].usd * user.balance).toLocaleString('fr-FR', {maximumFractionDigits:2}) + ' $', inline: true },
                    { name: '€ EUR', value: (result.data['elrond-erd-2'].eur * user.balance).toLocaleString('fr-FR', {maximumFractionDigits:2}) + ' €', inline: true },
                )
                .setTimestamp();
            message.channel.send(embed);
        });
    },
    name: 'add'
}
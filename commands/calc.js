const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    run: function(message, args, client) {
        if (args.length != 1) {
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor('Elrond-Bot', 'https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=012', 'https://github.com/RobinCouet/elrond-bot')
                .setDescription('Merci d\'indiquer la quantité ')
                .addFields(
                    { name: 'Commande : ', value: '!calc [quantité]' },
                );
               
            message.channel.send(embed);
            return;
        }
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=elrond-erd-2&vs_currencies=USD,EUR').then((result) => {

            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setURL('https://www.coingecko.com/en/coins/elrond')
                .setAuthor('Elrond-Bot', 'https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=012', 'https://github.com/RobinCouet/elrond-bot')
                .setDescription(args[0] + ' EGLD vaut actuellement : ')
                .addFields(
                    { name: '$ USD', value: (result.data['elrond-erd-2'].usd * args[0]).toLocaleString('fr-FR', {maximumFractionDigits:2}) + ' $', inline: true },
                    { name: '€ EUR', value: (result.data['elrond-erd-2'].eur * args[0]).toLocaleString('fr-FR', {maximumFractionDigits:2}) + ' €', inline: true },
                )
                .setTimestamp();
            message.channel.send(embed);
        });
    },
    name: 'calc'
}
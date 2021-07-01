const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    run: function(message, args, client) {
        const amount = parseFloat(args[0].replace(',', '.'));
        let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Elrond-Bot', 'https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=012', 'https://github.com/RobinCouet/elrond-bot');

        if (args.length != 1 || isNaN(amount)) {
            embed.setDescription('Merci d\'indiquer la quantité ')
            .addFields(
                { name: 'Commande : ', value: '!calc [quantité]' },
            );
            message.channel.send(embed);
            
            return;
        }
        
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=elrond-erd-2&vs_currencies=USD,EUR').then((result) => {
            embed.setDescription(amount + ' EGLD vaut actuellement : ')
                .addFields(
                    { name: '$ USD', value: (result.data['elrond-erd-2'].usd * amount).toLocaleString('fr-FR', {maximumFractionDigits:2}) + ' $', inline: true },
                    { name: '€ EUR', value: (result.data['elrond-erd-2'].eur * amount).toLocaleString('fr-FR', {maximumFractionDigits:2}) + ' €', inline: true },
                )
                .setTimestamp();
            message.channel.send(embed);
        });
    },
    name: 'calc'
}
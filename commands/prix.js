const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    run: function(message) {
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=elrond-erd-2&vs_currencies=USD,EUR').then((result) => {

            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setURL('https://www.coingecko.com/en/coins/elrond')
                .setAuthor('Elrond-Bot', 'https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=012', 'https://github.com/RobinCouet/elrond-bot')
                .setDescription('Le prix de l\'EGLD est de : ')
                .addFields(
                    { name: '$ USD', value: result.data['elrond-erd-2'].usd + ' $' },
                    { name: '€ EUR', value: result.data['elrond-erd-2'].eur + ' €' },
                )
                .setTimestamp();
            message.channel.send(embed);
        });
    },
    name: 'prix'
}
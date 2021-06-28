const axios = require('axios');
module.exports = {
    run: function(message) {
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=elrond-erd-2&vs_currencies=USD').then((result) => {
            message.channel.send('Le prix de l\'EGLD est de : ' + result.data['elrond-erd-2'].usd + ' $');
        });
    },
    name: 'prix'
}
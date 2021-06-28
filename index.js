const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Discord.Client();

client.login(process.env.TOKEN);

client.commands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith('!')) return
    const command = client.commands.get(commandName.slice(1))
    if (!command) return
    command.run(message, args, client)
})

client.on('ready', () => {
    client.user.setPresence({
        activity: {type: 'WATCHING', url: 'https://open.spotify.com/embed/track/3Knohqfb9jeYzL6wMZiWLM', name: 'le prix chuter'}
    })
})
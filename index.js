const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";

client.on("message", function(message) {

    if (message.author.bot) return;

    const channel = client.channels.cache.find(channel => channel.name === "orga-event");
    const author = message.author.username;

    if (message.channel.type === "dm") {
        channel.send(`**${author}** a envoyé : ${message.content}`);
        message.author.send("Bien reçu!");
    }

});

client.login(config.BOT_TOKEN);

client.on('ready', () => {
    console.log('Logged in!')
});


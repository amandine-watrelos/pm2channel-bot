const Discord = require("discord.js");
const config = require("./config/keys.js");

const client = new Discord.Client();

const prefix = "!";
let channelRedirection = "";

client.on("message", function(message) {

    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {

        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();
        let response = "";

        if (command === "channel") {
            let channelArg = args[0];
            const isChannelValid = client.channels.cache.find(channel => channel.name === channelArg) !== undefined ? true : false;

            if (isChannelValid) {
                response = `PMs are now redirected to **${channelArg}** channel.`;
                channelRedirection = channelArg;
            } else {
                response = `The channel **${channelArg}** is not valid.`;
            }

            message.reply(response);
        }

    } else {

        const channel = client.channels.cache.find(channel => channel.name === channelRedirection);
        const author = message.author.username;

        if (message.channel.type === "dm") {
            if (channel == undefined) {
                message.author.send("Your message could not be sent : the redirection channel has not been specified.");
            } else {
                //channel.send(`**${author}** sent : ${message.content}`);
                channel.send(`:monkey_face: :monkey_face: ${message.content}`);
                message.author.send("Message received !");
            }
        }
    }

});

client.login(config.BOT_TOKEN);

client.on('ready', () => {
    console.log('Logged in!')
});


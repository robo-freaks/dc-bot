const { Client, GatewayIntentBits, Collection, Message, ActivityType } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const venv = require('dotenv');
const fs = require('fs');
venv.config();

const token = process.env.bot_token
const id = process.env.application_id

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();




const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!'
    },
    {
        name: 'help',
        description: 'Helps you or something.'
    },
    {
        name: 'say',
        description: 'Replies with your message',
        options: [
            {
                name: 'message',
                description: 'The message you want the bot to say',
                type: 3,
                required: true
            }
        ]
    },
    {
        name: 'userinfo',
        description: 'Replies with user information',
        options: [
            {
                name: 'user',
                description: 'The user you want to get information for',
                type: 6
            }
        ]
    },
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(id),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});




client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const commandName = interaction.commandName;
  const args = interaction.options;

  if (commandName === 'ping') {
    if (commandName === 'ping') {
        const dat = Date.now()
        const latency = dat - interaction.createdTimestamp;
        if (isNaN(latency)) {
          await interaction.reply(`⌛ Latency is for some reason not available right now.  -  ⏲ API Ping is ${Math.round(client.ws.ping)}`);
        } else {
          await interaction.reply(`⌛ Latency is ${latency}ms  -  ⏲ API Ping is ${Math.round(client.ws.ping)}`);
        }
      }
      
    } else if (commandName === 'say') {
      const message = args.getString('message');
      await interaction.reply(message);
    } else if (commandName === 'help') {
        await interaction.reply(`Hey! This bot is still in development and this is only a prototype to see if everythings working, but a beta version with a q&a system and more will soon be released!`);
    } else if (commandName === 'userinfo') {
      const user = args.getUser('user') || interaction.user;
      await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
  }
});





client.login(token);
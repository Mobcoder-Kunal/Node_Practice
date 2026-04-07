require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: "ping",
        description: "replies with pong!",
    },
    {
        name: "chat",
        description: "chat with the bot",
        options: [
            {
                name: "message",
                type: 3,
                description: "What do you want to say?",
                required: true
            }
        ]
    }
]

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.")

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.")
    } catch (error) {
        console.error(error)
    }
})();
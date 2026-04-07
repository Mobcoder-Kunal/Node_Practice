require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith("create")) {
        const url = message.content.split("create ")[1];
        return message.reply({
            content: "Generating sortURL for " + url,
        })
    }
    message.reply({
        content: "Hello, I am Doland Trump!",
    })

})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") await interaction.reply("pong!!")

    if (interaction.commandName === "chat") {
        const userMessage = interaction.options.getString("message");
        await interaction.deferReply();

        try {
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "phi3.5:latest",
                    prompt: `You are a funny Discord bot. Reply shortly.\nUser: ${userMessage}`,
                    stream: false
                })
            })
            const data = await response.json();
            await interaction.editReply(data.response)

        } catch (error) {
            console.error(error);
            await interaction.editReply("Error talking to AI.");
        }
    }
})


client.login(process.env.TOKEN)
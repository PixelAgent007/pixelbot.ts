import "reflect-metadata";

import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import * as dotenv from 'dotenv'

dotenv.config()

export const bot = new Client({
    // To only use global commands (use @Guild for specific guild command), comment this line
    // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

    // Discord intents
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildWebhooks,
        IntentsBitField.Flags.GuildPresences
    ],

    // Debug logs are disabled in silent mode
    silent: false,

    // Configuration for @SimpleCommand
    simpleCommand: {
        prefix: "!"
    }
});

bot.once("ready", async () => {
    // Make sure all guilds are cached
    await bot.guilds.fetch();

    // Synchronize applications commands with Discord
    await bot.initApplicationCommands();

    /* Use this to clear guild commands
    await bot.clearApplicationCommands(
        ...bot.guilds.cache.map((g) => g.id)
    );
     */

    console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => { bot.executeInteraction(interaction); });
bot.on("messageCreate", (message) => { bot.executeCommand(message); });

async function run() {
    await importx(".sample.", dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}");

    // Check token
    if (process.env.BOT_TOKEN === undefined) {
        throw Error("Could not find BOT_TOKEN in your environment");
    }

    // Log in
    await bot.login(process.env.BOT_TOKEN);
}

await run();

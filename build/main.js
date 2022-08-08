import "reflect-metadata";
import { dirname, importx } from "@discordx/importer";
import { EmbedBuilder, IntentsBitField } from "discord.js";
import { Client } from "discordx";
import { MongoClient } from "mongodb";
import { ChannelType } from "discord-api-types/v9";
export const bot = new Client({
    // To only use global commands (use @Guild for specific guild command), comment this line
    botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
    // Discord intents
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildVoiceStates
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
    // To clear all guild commands, uncomment this line,
    // This is useful when moving from guild commands to global commands
    // It must only be executed once
    //
    //  await bot.clearApplicationCommands(
    //    ...bot.guilds.cache.map((g) => g.id)
    //  );
    // Create JTC config database collection
    const dbClient = new MongoClient("mongodb://pixelbot:pixelbot@pixelbotdb:27017/pixelbot");
    const db = dbClient.db("pixelbot");
    try {
        await db.createCollection("jtc_config", {});
    }
    catch (e) {
        console.log(e);
    }
    // Init JTC Config for all guilds
    let guild;
    for (guild of bot.guilds.cache) {
        await db.collection("jtc_config").insertOne({
            channels: [],
            guildId: guild[1].id,
            lock_roles: null,
        });
        await guild[1].channels.fetch();
        const channel = guild[1].channels.cache.find((channel) => channel.type === ChannelType.GuildText);
        const embed = new EmbedBuilder()
            .setTitle("👋 Hey, I'm Atis.")
            .setDescription("Thanks for inviting me.\nTo get started, run /setup.")
            .setColor(0x9900ff)
            .setFooter({ text: "Made with ❤ by PixelAgent007" });
        await channel.send({ embeds: [embed] });
    }
    await dbClient.close();
    console.log("Bot started");
});
bot.on("interactionCreate", (interaction) => {
    bot.executeInteraction(interaction);
});
bot.on("messageCreate", (message) => {
    bot.executeCommand(message);
});
async function run() {
    await importx(".sample.", dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}");
    // Check token
    if (!process.env.BOT_TOKEN) {
        throw Error("Could not find BOT_TOKEN in your environment");
    }
    // Log in
    await bot.login(process.env.BOT_TOKEN);
}
run();

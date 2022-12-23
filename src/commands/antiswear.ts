import type { CommandInteraction } from "discord.js";
import { Discord, Guild, SlashOption } from "discordx";
import { SlashEx } from "../lib/Slash.js";
import { readFileSync, writeFileSync } from "fs";
import { ApplicationCommandOptionType } from "discord.js";

@Discord()
export class AntiswearCommands {
    @SlashEx("blacklistword", { description: "Blacklist word(s) from the profanity filter. Can only be run by mods.", usage: "/blacklistword <word>\nSeparate words with commas" })
    async blacklistword(
        @SlashOption("word", { type: ApplicationCommandOptionType.String })
        word: string | undefined,
        interaction: CommandInteraction
    ): Promise<void> {
        if (!interaction.guild || !interaction.member) return;

        if (!word) {
            await interaction.reply({ ephemeral: true, content: "You need to specify word(s)" });
            return;
        }
        if (word.startsWith(",") || word.endsWith(",")) {
            await interaction.reply({ ephemeral: true, content: "Bad argument" });
            return;
        }

        if (word.includes("deez")) {
            await interaction.reply({ ephemeral: true, content: "Thou shalt not blacklist a holy word!\nalso dragon deez nuts" });
            return;
        }

        const config = JSON.parse(readFileSync("./config.json").toString()).antiswear;

        if (interaction.member.user.id !in config.moderators) {
            await interaction.reply({ ephemeral: true, content: "Thou shalt not use this command, **peasant!**" });
            return;
        }

        const words = word.split(",");
        config.words.blacklist.push(...words.filter(x => !config.words.blacklist.includes(x)));
        // @ts-ignore
        config.words.whitelist = config.words.whitelist.filter(x => !words.includes(x));

        writeFileSync("./config.json", JSON.stringify(config.antiswear));
        await interaction.reply({ ephemeral: true, content: "Added word" });
    }

    @SlashEx("whitelistword", { description: "Whitelist word(s) from the profanity filter. Can only be run by mods.", usage: "/whitelistword <word>\nSeparate words with commas" })
    async whitelistword(
        @SlashOption("word", { type: ApplicationCommandOptionType.String })
        word: string | undefined,
        interaction: CommandInteraction
    ): Promise<void> {
        if (!interaction.guild || !interaction.member) return;
        if (!word) {
            await interaction.reply({ ephemeral: true, content: "You need to specify word(s)" });
            return;
        }
        if (word.startsWith(",") || word.endsWith(",")) {
            await interaction.reply({ ephemeral: true, content: "Bad argument" });
            return;
        }

        const config = JSON.parse(readFileSync("./config.json").toString()).antiswear;

        if (interaction.member.user.id !in config.moderators) {
            await interaction.reply({ ephemeral: true, content: "Thou shalt not use this command, **peasant!**" });
            return;
        }

        const words = word.split(",");
        config.words.whitelist.push(...words.filter(x => !config.words.whitelist.includes(x)));
        // @ts-ignore
        config.words.blacklist = config.words.blacklist.filter(x => !words.includes(x));

        writeFileSync("./config.json", JSON.stringify(config.antiswear));
        await interaction.reply({ ephemeral: true, content: "Added word" });
    }
}

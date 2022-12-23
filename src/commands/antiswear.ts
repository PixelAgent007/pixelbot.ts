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

        const config = JSON.parse(readFileSync("./config.json").toString());

        if (interaction.member.user.id !in config.antiswear.moderators) {
            await interaction.reply({ ephemeral: true, content: "Thou shalt not use this command, **peasant!**" });
            return;
        }

        const words = word.split(",");
        config.antiswear.words.blacklist.push(...words.filter(x => !config.antiswear.words.blacklist.includes(x)));
        // @ts-ignore
        config.antiswear.words.whitelist = config.antiswear.words.whitelist.filter(x => !words.includes(x));

        writeFileSync("./config.json", JSON.stringify(config));
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

        const config = JSON.parse(readFileSync("./config.json").toString());

        if (interaction.member.user.id !in config.antiswear.moderators) {
            await interaction.reply({ ephemeral: true, content: "Thou shalt not use this command, **peasant!**" });
            return;
        }

        const words = word.split(",");
        config.antiswear.words.whitelist.push(...words.filter(x => !config.antiswear.words.whitelist.includes(x)));
        // @ts-ignore
        config.antiswear.words.blacklist = config.antiswear.words.blacklist.filter(x => !words.includes(x));

        writeFileSync("./config.json", JSON.stringify(config));
        await interaction.reply({ ephemeral: true, content: "Added word" });
    }
}

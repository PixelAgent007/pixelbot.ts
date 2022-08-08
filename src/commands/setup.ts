import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, SlashChoice, SlashOption } from "discordx";
import { SlashEx } from "../lib/Slash";

@Discord()
export class SlashExample {
    @SlashEx("setup", { description: "Instructions on how to set up the bot" })
    async setup(
        @SlashChoice("jtc")
        @SlashOption("choice", { description: "Choose what to set up" })
        choice: string,
        interaction: CommandInteraction
    ): Promise<void> {
        switch (choice) {
            case "jtc":
                await interaction.reply("Reply to this message with the Channel IDs ");
                await interaction.reply({embeds: [
                    new EmbedBuilder()
                        .setTitle("Join to Create set up.")
                        .setDescription("Try joining the voice channel(s) you specified.")
                        .setColor(0x9900ff)
                        .setFooter({ text: "Made with ❤ by PixelAgent007" })
                ]});
                break;
            default:
                break;
        }
    }
}

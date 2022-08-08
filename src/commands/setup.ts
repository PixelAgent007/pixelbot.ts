import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, SlashChoice, SlashOption } from "discordx";
import { SlashEx } from "../lib/Slash.js";

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
                await interaction.reply({embeds: [
                    new EmbedBuilder()
                        .setTitle("Join to Create Setup")
                        .addFields({ name: "1.", value: "Get the channel IDs of the channels you want to activate JTC for. To find out on how to get IDs, run /ids" })
                        .addFields({ name: "2.", value: "Run /setupjtc <channelid(s) seperated by comma, without any spaces> [roleid(s) seperated by comma, without any spaces]" })
                        .addFields({ name: "Note", value: "Arguments in square brackets [] are optional. If roles are specified, they will be able to lock (make it private) the jtc channel they are in IF they created it." })
                        .setColor(0x9900ff)
                        .setFooter({ text: "Made with ❤ by PixelAgent007" })
                ]});
                break;
            default:
                break;
        }
    }
}

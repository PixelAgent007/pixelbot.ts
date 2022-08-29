import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord } from "discordx";
import { SlashEx } from "../lib/Slash.js";
import { ChannelType } from "discord-api-types/v9";

@Discord()
export class IdsCommand {
    @SlashEx("ids", { description: "Instructions on how to get channel, user and role ids." })
    async ids(interaction: CommandInteraction): Promise<void> {
        if (!interaction.guild) return;
        await interaction.reply({embeds: [
                new EmbedBuilder()
                    .setTitle("How do you find IDs?")
                    .setDescription("First make sure you have Developer Mode enabled on your Discord by visiting your Discord settings and going to Appearance.")
                    // @ts-ignore
                    .addFields({ name: "Channel", value: "To get a Channel ID right click the channel and click on \"Copy ID\" then paste it into your Discord or on a text editor. Alternatively type the channel as a mention and place a backslash \\ in front of the mention. It should look like this \\<#" + interaction.guild.channels.cache.find((channel) => channel.type === ChannelType.GuildText).id + "> and the number is the ID." })
                    .addFields({ name: "User", value: "To get your User ID or anyone else’s User ID right click on their name and click \"Copy ID\" then paste it into your Discord or on a text editor. Alternative type there name as a mention and place a backslash \\ in front of the mention. It should look like this \\<@!848816915577045002> and the numbers are the ID." })
                    .addFields({ name: "Role", value: "To get a role ID open your server settings, head over to roles and click the three dots. It should open a context menu where you can just click \"Copy ID\"" })
                    .setColor(0x9900ff)
                    .setFooter({ text: "Made with ❤ by PixelAgent007" })
            ]});
    }
}

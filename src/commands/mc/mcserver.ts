import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, SlashChoice, SlashOption } from "discordx";

const Dockerode = require("dockerode");

// @ts-ignore
import { SlashEx } from "../lib/Slash.js";

@Discord()
export class McServerCommand {
    @SlashEx("setup", { description: "Instructions on how to set up the bot" })
    async setup(
        @SlashChoice("start")
        @SlashChoice("stop")
        @SlashChoice("restart")
        @SlashOption("choice", { description: "Choose action" })
        choice: string,
        interaction: CommandInteraction
    ): Promise<void> {
        if (interaction.guildId !== "993563200786280470") return;

        const docker = new Dockerode();

        const containerId = "f3ae6e82d669";
        const container = docker.getContainer(containerId);

        switch (choice) {
            case "start":
                await container.start(async (err: any, data: any) => {
                    if (err) await interaction.reply({embeds: [
                            new EmbedBuilder()
                                .setTitle("Error whilst starting container")
                                .setDescription("```" + err + "```")
                                .setColor(0x9900ff)
                                .setFooter({ text: "Made with ❤ by PixelAgent007" })
                        ]});
                    else await interaction.reply({embeds: [
                                new EmbedBuilder()
                                    .setTitle("Server starting...")
                                    .setDescription("IP: `helios.oskar.global`")
                                    .setColor(0x9900ff)
                                    .setFooter({ text: "Made with ❤ by PixelAgent007" })
                            ]});
                });
                break;
            case "stop":
                await container.stop(async (err: any, data: any) => {
                    if (err) await interaction.reply({embeds: [
                            new EmbedBuilder()
                                .setTitle("Error whilst stopping container")
                                .setDescription("```" + err + "```")
                                .setColor(0x9900ff)
                                .setFooter({ text: "Made with ❤ by PixelAgent007" })
                        ]});
                    else await interaction.reply({embeds: [
                            new EmbedBuilder()
                                .setTitle("Server down")
                                .setColor(0x9900ff)
                                .setFooter({ text: "Made with ❤ by PixelAgent007" })
                        ]});
                });
                break;
            case "restart":
                await container.restart(async (err: any, data: any) => {
                    if (err) await interaction.reply({embeds: [
                            new EmbedBuilder()
                                .setTitle("Error whilst restarting container")
                                .setDescription("```" + err + "```")
                                .setColor(0x9900ff)
                                .setFooter({ text: "Made with ❤ by PixelAgent007" })
                        ]});
                    else await interaction.reply({embeds: [
                            new EmbedBuilder()
                                .setTitle("Server restarting...")
                                .setColor(0x9900ff)
                                .setFooter({ text: "Made with ❤ by PixelAgent007" })
                        ]});
                });
                break;
        }
    }
}

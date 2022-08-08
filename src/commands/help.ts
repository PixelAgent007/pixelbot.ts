import { Pagination, PaginationItem } from "@discordx/pagination";
import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";
import { UsageStorage } from "../lib/UsageStorage.js";

@Discord()
export class HelpCommand {

    @Slash("help", { description: "Help menu for all slash commands" })
    async help(interaction: CommandInteraction): Promise<void> {

        const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
            const usage = UsageStorage.get(cmd.name);
            return { description: cmd.description, name: cmd.name, usage: usage };
        });

        if (commands === null || commands.length === 1) return;

        const pages: PaginationItem[] = commands.map((cmd, i) => {
            const page = new EmbedBuilder()
                .setTitle("**Help menu**")
                .setDescription(`Page ${i + 1} of ${commands.length}`)
                .addFields({ name: "Name", value: cmd.name })
                .addFields({ name: "Description", value: cmd.description })
                .addFields({ name: "Usage", value: cmd.usage })
                .setColor(0x9900ff)
                .setFooter({ text: "Made with ❤ by PixelAgent007" });
            return page as PaginationItem;
        });

        if (pages == null) return;

        const pagination = new Pagination(interaction, pages);
        await pagination.send();
    }
}

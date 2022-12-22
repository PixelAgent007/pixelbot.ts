import type { CommandInteraction } from "discord.js";
import { Discord } from "discordx";
import { SlashEx } from "../../lib/Slash.js";
import fetch from "node-fetch";

@Discord()
export class ComplimentCommand {
    @SlashEx("compliment", { description: "Receive a nice compliment", usage: "/compliment" })
    async compliment(interaction: CommandInteraction): Promise<void> {
        await fetch("https://complimentr.com/api")
            .then((res) => { return res.json(); })
            // @ts-ignore
            .then(async (data) => { await interaction.reply(data.compliment); });
    }
}

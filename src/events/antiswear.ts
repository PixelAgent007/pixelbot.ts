import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { GuildMember, InteractionResponse, MessageComponentInteraction, TextChannel, WebhookClient } from "discord.js";
import fetch from "node-fetch";
import BadWords from "bad-words";

@Discord()
export class AntiSwearListener {
    allowedUsers = [
        "933819147362648115",
        "685771268988993548"
    ];

    filter = new BadWords()

    @On("messageCreate")
    messageCreate([message]: ArgsOf<"messageCreate">, bot: Client): void {
        if (!message.guild) return;
        if (message.author.bot) return;
        if (message.webhookId) return;
        if (message.author.id in this.allowedUsers) return;

        if (!this.filter.isProfane(message.content)) return;

        const nick = message.guild.members.cache.find(u => u.id === message.author.id)?.nickname

        // @ts-ignore
        message.channel.createWebhook({
            name: nick ? nick : message.author.username,
            avatar: message.author.displayAvatarURL()
        }).then(async (webhook: WebhookClient) => {
            await message.delete();

            await fetch("https://complimentr.com/api")
                .then((res) => { return res.json(); })
                // @ts-ignore
                .then(async (data) => { await webhook.send(data.compliment); });

            await webhook.delete();
        });
    }
}

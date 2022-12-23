import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { Message, WebhookClient } from "discord.js";
import { readFileSync } from "fs";
import fetch from "node-fetch";
import BadWords from "bad-words";

@Discord()
export class AntiSwearListener {

    setupFilter() {
        const config = JSON.parse(readFileSync("./config.json").toString());

        this.filter.addWords(...config.antiswear.words.blacklist);
        this.filter.removeWords(...config.antiswear.words.whitelist);
        this.allowedUsers = config.antiswear.moderators;
    }

    allowedUsers: any[] = [];

    filter = new BadWords()

    replaceWithCompliment(message: Message) {
        const nick = message.guild?.members.cache.find(u => u.id === message.author.id)?.nickname;

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

    @On("messageCreate")
    messageCreate([message]: ArgsOf<"messageCreate">, bot: Client): void {
        if (!message.guild) return;
        if (message.author.bot) return;
        if (message.webhookId) return;

        this.setupFilter();

        // @ts-ignore
        if (this.allowedUsers.includes(message.author.id)) return;
        if (!this.filter.isProfane(message.content)) return;

        this.replaceWithCompliment(message);
    }

    @On("messageUpdate")
    messageUpdate([oldMessage, message]: ArgsOf<"messageUpdate">, bot: Client): void {
        if (!message.guild) return;
        if (!message.author) return;
        if (!message.content) return;
        if (message.author.bot) return;
        if (message.webhookId) return;

        this.setupFilter();

        if (this.allowedUsers.includes(message.author.id)) return;
        if (!this.filter.isProfane(message.content)) return;

        // @ts-ignore
        this.replaceWithCompliment(message);
    }

    @On("guildMemberUpdate")
    async guildMemberUpdate([oldMember, member]: ArgsOf<"guildMemberUpdate">, bot: Client): Promise<void> {
        if (!member.nickname) return;

        this.setupFilter();

        if (member.id in this.allowedUsers) return;
        if (!this.filter.isProfane(member.nickname)) return;

        try {
            await member.setNickname("be nice");
        } catch (e) {}
    }
}

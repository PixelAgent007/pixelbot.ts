var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pagination } from "@discordx/pagination";
import { EmbedBuilder } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";
import { UsageStorage } from "../lib/UsageStorage";
let HelpCommand = class HelpCommand {
    async help(interaction) {
        const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
            const usage = UsageStorage.get(cmd.name);
            return { description: cmd.description, name: cmd.name, usage: usage };
        });
        if (commands === null || commands.length === 1)
            return;
        const pages = commands.map((cmd, i) => {
            const page = new EmbedBuilder()
                .setTitle("**Help menu**")
                .setDescription(`Page ${i + 1} of ${commands.length}`)
                .addFields({ name: "Name", value: cmd.name })
                .addFields({ name: "Description", value: cmd.description })
                .addFields({ name: "Usage", value: cmd.usage })
                .setColor(0x9900ff)
                .setFooter({ text: "Made with ❤ by PixelAgent007" });
            return page;
        });
        if (pages == null)
            return;
        const pagination = new Pagination(interaction, pages);
        await pagination.send();
    }
};
__decorate([
    Slash("help", { description: "Help menu for all slash commands" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], HelpCommand.prototype, "help", null);
HelpCommand = __decorate([
    Discord()
], HelpCommand);
export { HelpCommand };

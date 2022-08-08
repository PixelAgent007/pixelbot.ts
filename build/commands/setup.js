var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { EmbedBuilder } from "discord.js";
import { Discord, SlashChoice, SlashOption } from "discordx";
import { SlashEx } from "../lib/Slash";
let SlashExample = class SlashExample {
    async setup(choice, interaction) {
        switch (choice) {
            case "jtc":
                await interaction.reply("Reply to this message with the Channel IDs ");
                await interaction.reply({ embeds: [
                        new EmbedBuilder()
                            .setTitle("Join to Create set up.")
                            .setDescription("Try joining the voice channel(s) you specified.")
                            .setColor(0x9900ff)
                            .setFooter({ text: "Made with ❤ by PixelAgent007" })
                    ] });
                break;
            default:
                break;
        }
    }
};
__decorate([
    SlashEx("setup", { description: "Instructions on how to set up the bot" }),
    __param(0, SlashChoice("jtc")),
    __param(0, SlashOption("choice", { description: "Choose what to set up" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", Promise)
], SlashExample.prototype, "setup", null);
SlashExample = __decorate([
    Discord()
], SlashExample);
export { SlashExample };

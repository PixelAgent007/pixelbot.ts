var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Discord, On } from "discordx";
import { VoiceChannel, VoiceState } from "discord.js";
import { MongoClient } from "mongodb";
import { generate } from "server-name-generator";
import { ChannelType } from "discord-api-types/v10";
let JTCVoiceStateUpdate = class JTCVoiceStateUpdate {
    onVoiceStateUpdate(oldState, newState) {
        if (newState.channel && newState.channel instanceof VoiceChannel) {
            const vc = newState.channel;
            const guild = newState.guild;
            const dbClient = new MongoClient("mongodb://pixelbot:pixelbot@pixelbotdb:27017/pixelbot");
            const db = dbClient.db("pixelbot");
            try {
                db.createCollection("jtc_channels", {});
            }
            catch (e) {
                console.log(e);
            }
            if (vc.id === "345678976543456") {
                guild.channels.create({ name: generate().replace(" ", "-"), type: ChannelType.GuildVoice })
                    .then(channel => {
                    db.collection("jtc_channels").insertOne({
                        channelId: channel.id,
                        guildId: guild.id,
                    });
                });
            }
            dbClient.close();
        }
    }
};
__decorate([
    On("voiceStateUpdate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VoiceState, VoiceState]),
    __metadata("design:returntype", void 0)
], JTCVoiceStateUpdate.prototype, "onVoiceStateUpdate", null);
JTCVoiceStateUpdate = __decorate([
    Discord()
], JTCVoiceStateUpdate);
export { JTCVoiceStateUpdate };

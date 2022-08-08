import { Discord, On } from "discordx";
import { VoiceChannel, VoiceState } from "discord.js";
import { MongoClient } from "mongodb";
import { generate } from "server-name-generator";
import { ChannelType } from "discord-api-types/v10";

@Discord()
export class JTCVoiceStateUpdate {


    @On("voiceStateUpdate")
    onVoiceStateUpdate(oldState: VoiceState, newState: VoiceState): void {
        if (newState.channel && newState.channel instanceof VoiceChannel) {

            const vc = newState.channel as unknown as VoiceChannel;
            const guild = newState.guild;

            const dbClient = new MongoClient("mongodb://pixelbot:pixelbot@pixelbotdb:27017/pixelbot");
            const db = dbClient.db("pixelbot");

            try {
                db.createCollection("jtc_channels", {});
            } catch (e) {
                console.log(e)
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
}

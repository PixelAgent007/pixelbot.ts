import { Slash } from "discordx";
import { UsageStorage } from "./UsageStorage";
export function SlashEx(name, options) {
    UsageStorage.add(name, options.usage);
    return Slash(name, options);
}

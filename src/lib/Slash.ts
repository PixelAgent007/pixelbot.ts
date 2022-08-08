import { ApplicationCommandOptions, MethodDecoratorEx, Slash } from "discordx";
import { UsageStorage } from "./UsageStorage";

export function SlashEx(name: string, options: ApplicationCommandOptionsEx): MethodDecoratorEx {
    UsageStorage.add(name, options.usage);
    return Slash(name, (<ApplicationCommandOptions>options));
}

export interface ApplicationCommandOptionsEx extends ApplicationCommandOptions {
    usage?: string;
    description: string;
}

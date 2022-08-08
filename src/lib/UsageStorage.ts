export class UsageStorage {
    private static usages: Map<string, string> = new Map<string, string>();

    public static add(command: string, usage: string | undefined): void {
        if (usage === undefined || usage === null) this.usages.set(command, command);
        else this.usages.set(command, usage);
    }

    public static get(command: string): string {
        return <string> this.usages.get(command);
    }

    public static getAll(): Map<string, string> {
        return this.usages;
    }
}
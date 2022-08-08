export class UsageStorage {
    static usages = new Map();
    static add(command, usage) {
        if (usage === undefined || usage === null)
            this.usages.set(command, command);
        else
            this.usages.set(command, usage);
    }
    static get(command) {
        return this.usages.get(command);
    }
    static getAll() {
        return this.usages;
    }
}

import { Validation } from "../../utils/validation";

export class UsernameManager  {
    private static instance: UsernameManager;

    private idUsernames: Map<string, string>;

    public static getInstance(): UsernameManager {
        if (!UsernameManager.instance) {
            UsernameManager.instance = new UsernameManager();
        }

        return UsernameManager.instance;
    }

    public validateUsername(username: string): boolean {
        return !this.idUsernames.has(username) && Validation.isValidName(username);
    }

    public hasUsername(username: string): boolean {
        return this.idUsernames.has(username);
    }

    public addUsername(socketId: string, username: string): void {
        const oldUsername: string | undefined = this.getUsername(socketId);
        if (oldUsername) {
            this.idUsernames.delete(oldUsername);
        }
        this.idUsernames.set(username, socketId);
    }

    public getSocketId(username: string): string {
        return (this.idUsernames.get(username)) as string;
    }

    public removeUsername(socketId: string): string | undefined {
        const removedUsername: string | undefined = this.getUsername(socketId);
        if (removedUsername) {
            this.idUsernames.delete(removedUsername);
        }

        return removedUsername;
    }

    public getUsername(socketId: string): string | undefined {
        let id: string | undefined;
        this.idUsernames.forEach((val: string, key: string) => {
            if (val === socketId) {
                id = key;
            }
        });

        return id;
    }

    private constructor() {
        this.idUsernames = new Map<string, string>();
    }
}

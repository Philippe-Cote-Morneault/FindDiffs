import { UsernameValidator } from "../user/usernameValidator";

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
        return !this.idUsernames.has(username) && UsernameValidator.validateUsername(username);
    }

    public hasUsername(username: string): boolean {
        return this.idUsernames.has(username);
    }

    public addUsername(socketId: string, username: string): void {
        const oldUsername: string | undefined = this.getUsername(socketId)
        if (oldUsername) {
            this.idUsernames.delete(oldUsername);
        }
        console.log("adding userName: " + username);
        this.idUsernames.set(username, socketId);
        console.log("printing usernames and sockets");
        this.idUsernames.forEach((val: string, key) => {
            console.log(key + " : " + val);
        });
    }

    public getSocketId(username: string): string {
        return (this.idUsernames.get(username)) as string;
    }

    public removeUsername(socketId: string): string | undefined {
        console.log("removingUsername");
        const removedUsername: string | undefined = this.getUsername(socketId);
        if (removedUsername) {
            this.idUsernames.delete(removedUsername);
        }
        console.log("removedUsername: " + removedUsername);

        return removedUsername;
    }

    public getUsername(socketId: string): string | undefined {
        console.log(this.idUsernames);
        let id: string | undefined;
        this.idUsernames.forEach((val: string, key) => {
            console.log("printing usernames and sockets");
            console.log(key + " : " + val);
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
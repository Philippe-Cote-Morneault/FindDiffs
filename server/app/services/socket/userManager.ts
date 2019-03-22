import { NotFoundException } from "../../../../common/errors/notFoundException";
import { _e, R } from "../../strings";
import { UsernameValidator } from "../user/usernameValidator";

export class UserManager  {
    private static instance: UserManager;

    private idUsernames: Map<string, string>;

    public static getInstance(): UserManager {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }

        return UserManager.instance;
    }

    public validateUsername(username: string): boolean {
        return !this.idUsernames.has(username) && UsernameValidator.validateUsername(username);
    }

    public hasUsername(username: string): boolean {
        return this.idUsernames.has(username);
    }

    public addUsername(socketId: string, username: string): void {
        console.log("adding userName: " + username);
        this.idUsernames.set(username, socketId);
        this.idUsernames.forEach((val: string, key) => {
            console.log(key + " : " + val);
        });
    }

    public getSocketId(username: string): string {
        return (this.idUsernames.get(username)) as string;
    }

    public removeUsername(socketId: string): string {
        console.log("removingUsername");
        const removedUsername: string = this.getUsername(socketId);
        this.idUsernames.delete(removedUsername);
        console.log("removedUsername: " + removedUsername);

        return removedUsername;
    }

    public getUsername(socketId: string): string {
        console.log(this.idUsernames);
        let id: string | undefined;
        this.idUsernames.forEach((val: string, key) => {
            console.log(key + " : " + val);
            if (val === socketId) {
                id = key;
            }
        });
        
        if (id === undefined) {
                throw new NotFoundException(_e(R.ERROR_INVALIDID, [socketId]));
        }

        return id;
    }

    private constructor() {
        this.idUsernames = new Map<string, string>();
    }
}
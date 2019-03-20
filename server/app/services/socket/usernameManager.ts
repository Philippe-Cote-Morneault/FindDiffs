import { NotFoundException } from "../../../../common/errors/notFoundException";
import { _e, R } from "../../strings";

export class UsernameManager {
    private static instance: UsernameManager;

    private idUsernames: Map<string, string>;

    public static getInstance(): UsernameManager {
        if (!UsernameManager.instance) {
            UsernameManager.instance = new UsernameManager();
        }

        return UsernameManager.instance;
    }

    public addUsername(socketId: string, username: string): void {
        this.idUsernames.set(socketId, username);
    }

    public getUsername(socketId: string): string {
        return (this.idUsernames.get(socketId)) as string;
    }

    public removeUsername(socketId: string): void {
        this.idUsernames.delete(socketId);
    }

    public getSocketId(username: string): string {
        const id: string | undefined =  Object.keys(this.idUsernames).find((key: string) => this.idUsernames[key] === username);
        if (id === undefined) {
                throw new NotFoundException(_e(R.ERROR_INVALIDID, [username]));
        }

        return id;
    }

    private constructor() {
        this.idUsernames = new Map<string, string>();
    }
}
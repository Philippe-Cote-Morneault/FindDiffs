export class UsernameManager {
    private static instance: UsernameManager;

    public static getInstance(): UsernameManager {
        if (!UsernameManager.instance) {
            UsernameManager.instance = new UsernameManager();
        }

        return UsernameManager.instance;
    }
}
export class AuthentificationService {
    private static instance: AuthentificationService;

    private authentifiedUsers: Map<string, string>;

    public static getInstance(): AuthentificationService {
        if (!AuthentificationService.instance) {
            AuthentificationService.instance = new AuthentificationService();
        }

        return AuthentificationService.instance;
    }
}

export class AuthentificationService {
    private static instance: AuthentificationService;

    public static getInstance(): AuthentificationService {
        if (!AuthentificationService.instance) {
            AuthentificationService.instance = new AuthentificationService();
        }

        return AuthentificationService.instance;
    }
}
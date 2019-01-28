export class GameCardImages {
    public originalImage: string;
    public modifiedImage: string;
    public differencesImages: string;

    public constructor(originalImage: string, modifiedImage: string, differencesImage: string) {
        this.originalImage = originalImage;
        this.modifiedImage = modifiedImage;
        this.differencesImage = differencesImage;
    }
}
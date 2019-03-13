export class FileUtils {
    // tslint:disable-next-line:no-suspicious-comment
    // TODO: Add regex, proper validation, and actual good code.
    public static fromDataURL(dataUrl: string, mimeType: string, isBase64: boolean): File {
        const dataInB64: string = dataUrl.split(",")[1];
        const decodedData: string = atob(dataInB64);
        const blob: Blob = new Blob([decodedData], {type : "image/png"});

        return new File([blob], "test.png", {type: "image/png"});
    }
}
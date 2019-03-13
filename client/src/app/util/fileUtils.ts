export class FileUtils {
    // tslint:disable-next-line:no-suspicious-comment
    // TODO: Add regex, proper validation, and actual good code.
    public static fromDataURL(dataUrl: string, mimeType: string, isBase64: boolean): File {
        const data: string = dataUrl.split(",")[1];
        const blob: Blob = new Blob([data], {type : "image/png"});

        return new File([blob], "test");
    }
}
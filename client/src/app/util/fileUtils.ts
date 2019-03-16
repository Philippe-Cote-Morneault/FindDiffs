
export class FileUtils {
    public static fromDataURL(dataUrl: string): Blob {
        const b64Data: string = dataUrl.split(",")[1];
        const byteCharacters: string = atob(b64Data);
        const byteNumbers: number[] = new Array<number>(byteCharacters.length);

        for (let i: number = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray: Uint8Array = new Uint8Array(byteNumbers);

        return new Blob([byteArray]);
    }
}

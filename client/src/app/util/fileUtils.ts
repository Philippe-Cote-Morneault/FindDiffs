
export class FileUtils {
    // tslint:disable-next-line:no-suspicious-comment
    // TODO: Add regex, proper validation, and actual good code.
    public static fromDataURL(dataUrl: string, mimeType: string, isBase64: boolean): Blob {
        const dataInB64: string = dataUrl.split(",")[1];
        const buffer = atob(dataInB64);
        //const blob: Blob = new Blob([buffer], {type : "image/png"});
        
        let rawLength = buffer.length;
        let array = new Uint8Array(new ArrayBuffer(rawLength));

        for(let i = 0; i < rawLength; i++) {
            array[i] = buffer.charCodeAt(i);
        }

        return new Blob([new Uint8Array(array)], {type: 'image/png'});
        //return 
        
        //return new File([array], "thumbnail.png", {type: "image/png"});
    }
}
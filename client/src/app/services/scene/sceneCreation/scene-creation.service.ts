import { Injectable } from "@angular/core";
import { ICommonScene } from "../../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";
//import { FileUtils } from "src/app/util/fileUtils";

@Injectable({
    providedIn: "root",
})
export class SceneCreationService {

    public constructor(private sceneLoaderService: SceneLoaderService) {}


    public createTumbnail(scene: ICommonScene, canvas: HTMLCanvasElement): Blob {
        console.log("createThumbnail");
        this.sceneLoaderService.loadOnCanvas(canvas, scene);

        const data: string = canvas.toDataURL("image/png");
        const b64Data: string = data.split(",")[1];
        const byteCharacters: string = atob(b64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        console.log(byteCharacters);

        return new Blob([byteArray], {type: "image/png"});



        //return Promise.bind(async() => { await fetch(canvas.toDataURL()).then((res) => res.blob()).then((blob) => {return blob}) });
        //const data: string = canvas.toDataURL("image/png");
        //return FileUtils.fromDataURL(data, "", false);





      //  console.log(data);
        //return FileUtils.fromDataURL(data, "", false);
        //const blob: Blob = new Blob([data]);
        //let file: File = new File([blob], "thumbnail.png");
        /*
        let file: File;
        canvas.toBlob((blob: Blob) => {
            file = new File([blob], "thumbnail.png");
        }, "image/png");
        */

        //return file;
    }
}

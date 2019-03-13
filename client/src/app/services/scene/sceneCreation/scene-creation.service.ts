import { Injectable } from "@angular/core";
import { ICommonScene } from "../../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";

@Injectable({
    providedIn: "root",
})
export class SceneCreationService {

    public constructor(private sceneLoaderService: SceneLoaderService) {}


    public createTumbnail(scene: ICommonScene, canvas: HTMLCanvasElement): void {
        console.log("createThumbnail");
        this.sceneLoaderService.loadOnCanvas(canvas, scene);
        /*
        let file: File;
        canvas.toBlob((blob: Blob) => {
            file = new File([blob], "thumbnail.png");
        }, "image/png");

        return file;
        */
    }
}

import { Injectable } from "@angular/core";
import { ICommonScene } from "../../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";

@Injectable({
    providedIn: "root",
})
export class SceneCreationService {

    public constructor(private sceneLoaderService: SceneLoaderService) {}

    public createTumbnail(scene: ICommonScene, canvas: HTMLCanvasElement): Blob {
        this.sceneLoaderService.loadOnCanvas(canvas, scene);

        const data: string = canvas.toDataURL("image/png");
        const b64Data: string = data.split(",")[1];
        const byteCharacters: string = atob(b64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        return new Blob([byteArray], {type: "image/png"});
    }
}

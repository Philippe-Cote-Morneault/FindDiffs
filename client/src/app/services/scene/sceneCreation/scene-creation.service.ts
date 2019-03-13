import { Injectable } from "@angular/core";
import { ICommonScene } from "../../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";

@Injectable({
    providedIn: "root",
})
export class SceneCreationService {

    public constructor(private sceneLoaderService: SceneLoaderService) {}

    public createTumbnail(scene: ICommonScene, canvas: HTMLCanvasElement): File {
        this.sceneLoaderService.loadOriginalScene(canvas, scene, false);
        canvas.dataUr
    }
}

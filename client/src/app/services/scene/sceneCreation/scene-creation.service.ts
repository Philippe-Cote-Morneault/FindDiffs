import { Injectable } from "@angular/core";
import { FileUtils } from "src/app/util/fileUtils";
import { ICommonScene } from "../../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";

@Injectable({
    providedIn: "root",
})
export class SceneCreationService {

    public constructor(private sceneLoaderService: SceneLoaderService) {}

    public createTumbnail(scene: ICommonScene, canvas: HTMLCanvasElement): File {
        this.sceneLoaderService.loadOriginalScene(canvas, scene, false);
        const imageData: string = canvas.toDataURL("image/png");

        return FileUtils.fromDataURL(imageData, "image/png", true);
    }
}

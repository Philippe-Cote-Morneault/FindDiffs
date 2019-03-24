import { Injectable } from "@angular/core";
import { ICommonScene } from "../../../../../../common/model/scene/scene";
import { FileUtils } from "../../../util/fileUtils";
import { SceneLoaderService } from "../sceneLoader/sceneLoader.service";

@Injectable({
    providedIn: "root",
})
export class SceneCreationService {

    public constructor(private sceneLoaderService: SceneLoaderService) {}

    public async createTumbnail(scene: ICommonScene, canvas: HTMLCanvasElement): Promise<Blob> {
        await this.sceneLoaderService.loadOnCanvas(canvas, scene);

        const data: string = canvas.toDataURL("image/png");

        return FileUtils.fromDataURL(data);
    }
}

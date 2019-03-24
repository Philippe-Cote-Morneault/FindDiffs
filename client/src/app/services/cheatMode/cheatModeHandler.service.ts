import { Injectable } from "@angular/core";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { SceneLoaderService } from "../scene/sceneLoader/sceneLoader.service";
import { CheatModeService } from "./cheatMode.service";
import { CheatModeTimeoutService } from "./cheatModeTimeout.service";

@Injectable({
    providedIn: "root",
})
export class CheatModeHandlerService {
    private static readonly T_STRING: string = "t";
    private toggleCheatMode: boolean;
    public currentOriginalScene: ICommonScene;
    public currentModifiedScene: ICommonSceneModifications;

    public constructor(private cheatModeService: CheatModeService,
                       private cheatModeTimeoutService: CheatModeTimeoutService) {
        this.cheatModeService = new CheatModeService();
        this.toggleCheatMode = false;
        this.cheatModeTimeoutService.ngOnInit();
    }

    public keyPressed(event: KeyboardEvent, originalSceneLoader: SceneLoaderService, modifiedSceneLoader: SceneLoaderService): void {
        if (event.key === CheatModeHandlerService.T_STRING) {
            this.toggleCheatMode = !this.toggleCheatMode;
            if (this.toggleCheatMode) {
                this.copySceneLoaders(originalSceneLoader, modifiedSceneLoader);
                this.cheatModeTimeoutService.startCheatMode(
                    this.cheatModeService,
                    this.currentOriginalScene,
                    this.currentModifiedScene,
                );
            } else {
                this.cheatModeTimeoutService.stopCheatMode();
                if (this.cheatModeService.cheatActivated) {
                    this.cheatModeService.toggleCheatMode(
                        (this.currentModifiedScene as ICommonGeometricModifications & ICommonThematicModifications),
                    );
                }
            }
        }
    }

    private copySceneLoaders(originalSceneLoader: SceneLoaderService, modifiedSceneLoader: SceneLoaderService): void {
        this.cheatModeService.originalLoaderService = originalSceneLoader;
        this.cheatModeService.modifiedLoaderService = modifiedSceneLoader;
    }
}

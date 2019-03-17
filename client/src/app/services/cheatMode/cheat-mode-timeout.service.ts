import { Injectable } from "@angular/core";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { CheatModeService } from "./cheat-mode.service";
@Injectable({
  providedIn: "root",
})
export class CheatModeTimeoutService {
  private static readonly intervalTime: number = 250;
  private timeout: NodeJS.Timeout;

  public startCheatMode(cheatModeService: CheatModeService,
                        currentOriginalScene: ICommonScene,
                        currentModifiedScene: ICommonSceneModifications): void {

    cheatModeService.toggleCheatMode(currentOriginalScene,
                                     (currentModifiedScene as ICommonGeometricModifications));
    this.timeout = setTimeout(() => {
        this.startCheatMode(cheatModeService, currentOriginalScene, currentModifiedScene);
    },                        CheatModeTimeoutService.intervalTime);
  }

  public stopCheatMode(): void {
    clearTimeout(this.timeout);
  }

}

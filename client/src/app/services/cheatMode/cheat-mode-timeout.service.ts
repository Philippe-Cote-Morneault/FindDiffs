/* import { Injectable, OnInit } from "@angular/core";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { CheatModeService } from "./cheat-mode.service";
@Injectable({
  providedIn: "root",
})
export class CheatModeTimeoutService implements OnInit {
  private static readonly intervalTime: number = 250;
  private timeout: NodeJS.Timeout;

  public ngOnInit(): void {
    clearTimeout(this.timeout);
  }

  public async startCheatMode(cheatModeService: CheatModeService,
                              currentOriginalScene: ICommonScene,
                              currentModifiedScene: ICommonSceneModifications): Promise<void> {

    await cheatModeService.toggleCheatMode(currentOriginalScene,
                                           (currentModifiedScene as ICommonGeometricModifications));
    this.timeout = setTimeout(async () => {
        await this.startCheatMode(cheatModeService, currentOriginalScene, currentModifiedScene);
    },                        CheatModeTimeoutService.intervalTime);
  }

  public stopCheatMode(): void {
    clearTimeout(this.timeout);
  }

}
*/
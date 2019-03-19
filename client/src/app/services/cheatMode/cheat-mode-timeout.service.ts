import { Injectable, OnInit } from "@angular/core";
import { ICommonGeometricModifications } from "../../../../../common/model/scene/modifications/geometricModifications";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";
import { ICommonThematicModifications } from "../../../../../common/model/scene/modifications/thematicModifications";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { CheatModeService } from "./cheat-mode.service";
@Injectable({
  providedIn: "root",
})
export class CheatModeTimeoutService implements OnInit {
    private readonly INTERVAL_TIME: number = 250;
  private timeout: NodeJS.Timeout;

  public ngOnInit(): void {
    clearTimeout(this.timeout);
  }

  public async startCheatMode(cheatModeService: CheatModeService,
                              currentOriginalScene: ICommonScene,
                              currentModifiedScene: ICommonSceneModifications): Promise<void> {

    await cheatModeService.toggleCheatMode(
      (currentModifiedScene as ICommonGeometricModifications & ICommonThematicModifications),
    );
            this.INTERVAL_TIME);
  }

  public stopCheatMode(): void {
    clearTimeout(this.timeout);
  }

}

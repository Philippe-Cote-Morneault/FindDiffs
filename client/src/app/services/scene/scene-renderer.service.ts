import { Injectable } from "@angular/core";
import * as THREE from "three";
import { ICommonScene } from "../../../../../common/model/scene/scene";
import { ICommonSceneModifications } from "../../../../../common/model/scene/modifications/sceneModifications";

@Injectable({
  providedIn: "root",
})
export class SceneRendererService {

  public constructor() { 

  }

  public renderScene(renderer: THREE.WebGLRenderer, scene: ICommonScene): void {
	
  }

  public renderModifedScene(renderer: THREE.WebGLRenderer, originalScene: ICommonScene,
                            modifiedScene: ICommonSceneModifications): void {

    
  }
}

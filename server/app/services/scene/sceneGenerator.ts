import { DefaultGrid, Grid } from "./grid";

export class SceneGenerator {
    private objectQty: number;
    private readonly SCENE_SIZE: number =  1000;
    private readonly SCENE_OBJECT_MARGIN: number = 20;

    public constructor(objectQty: number) {
        this.objectQty = objectQty;
    }

    public generateScene(): void {
        // TODO change for generated grids with a singleton to store 10 examples
        const grid: Grid = new DefaultGrid(this.SCENE_SIZE, this.SCENE_SIZE, this.SCENE_OBJECT_MARGIN);

        for (let i: number = 0; i < this.objectQty; i++) {
            // TODO assign position to object
            grid.getNextPosition();
        }
    }
}

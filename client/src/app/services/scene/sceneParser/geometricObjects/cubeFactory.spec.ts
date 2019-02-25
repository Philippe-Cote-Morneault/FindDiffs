import { expect } from "chai";
import { ICommonCube } from "../../../../../../../common/model/scene/objects/geometricObjects/cube";
import { GeometricShapeType } from "../../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ObjectType } from "../../../../../../../common/model/scene/scene";
import { CubeFactory } from "./cubeFactory";

describe("CubeFactory", () => {
    const factory: CubeFactory = new CubeFactory();

    const cube: ICommonCube= {
        width: 5,
        color: 0x123,
        shapeType: GeometricShapeType.CONE,
        id: "ababa123",
        orientation: {
            xAngle: 4,
            yAngle: 2,
            zAngle: 1,
        },
        position: {
            x: 1510,
            y: 25,
            z: 100,
        },
        type: ObjectType.Geometric,
    };

    const object3d: THREE.Object3D = factory.parse(cube);

    it("Object3D positions should match the model.", () => {
        expect(object3d.position.x).to.equal(cube.position.x);
        expect(object3d.position.y).to.equal(cube.position.y);
        expect(object3d.position.z).to.equal(cube.position.z);
    });

    it("Object3D rotation should match the model.", () => {
        expect(object3d.rotation.x).to.equal(cube.orientation.xAngle);
        expect(object3d.rotation.y).to.equal(cube.orientation.yAngle);
        expect(object3d.rotation.z).to.equal(cube.orientation.zAngle);
    });

    it("Object3D's id should match the model.", () => {
        expect(object3d.userData.id).to.equal(cube.id);
    });
});

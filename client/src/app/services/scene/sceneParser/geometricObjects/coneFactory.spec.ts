import { expect } from "chai";
import { ICommonCone } from "../../../../../../../common/model/scene/objects/geometricObjects/cone";
import { GeometricShapeType } from "../../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ObjectType } from "../../../../../../../common/model/scene/scene";
import { ConeFactory } from "./coneFactory";

describe("ConeFactory", () => {
    const factory: ConeFactory = new ConeFactory();

    const cone: ICommonCone = {
        radius: 5,
        height: 10,
        color: 0x123,
        shapeType: GeometricShapeType.CONE,
        id: "ababa123",
        orientation: {
            xAngle: 3,
            yAngle: 0,
            zAngle: 7,
        },
        position: {
            x: 100,
            y: 20,
            z: 150,
        },
        type: ObjectType.Geometric,
    };

    const object3d: THREE.Object3D = factory.parse(cone);

    it("Object3D positions should match the model.", () => {
        expect(object3d.position.x).to.equal(cone.position.x);
        expect(object3d.position.y).to.equal(cone.position.y);
        expect(object3d.position.z).to.equal(cone.position.z);
    });

    it("Object3D rotation should match the model.", () => {
        expect(object3d.rotation.x).to.equal(cone.orientation.xAngle);
        expect(object3d.rotation.y).to.equal(cone.orientation.yAngle);
        expect(object3d.rotation.z).to.equal(cone.orientation.zAngle);
    });

    it("Object3D's id should match the model.", () => {
        expect(object3d.userData.id).to.equal(cone.id);
    });
});

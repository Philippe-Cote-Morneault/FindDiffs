import { expect } from "chai";
import { GeometricShapeType } from "../../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonSphere } from "../../../../../../../common/model/scene/objects/geometricObjects/sphere";
import { ObjectType } from "../../../../../../../common/model/scene/scene";
import { SphereFactory } from "./sphereFactory";

describe("SphereFactory", () => {
    const factory: SphereFactory = new SphereFactory();

    const sphere: ICommonSphere = {
        radius: 6,
        color: 0x123,
        shapeType: GeometricShapeType.CONE,
        id: "ababgdg2gfdgfd34",
        orientation: {
            xAngle: 4,
            yAngle: 5,
            zAngle: 6,
        },
        position: {
            x: 165,
            y: 26,
            z: 130,
        },
        type: ObjectType.Geometric,
    };

    const object3d: THREE.Object3D = factory.parse(sphere);

    it("Object3D positions should match the model.", () => {
        expect(object3d.position.x).to.equal(sphere.position.x);
        expect(object3d.position.y).to.equal(sphere.position.y);
        expect(object3d.position.z).to.equal(sphere.position.z);
    });

    it("Object3D rotation should match the model.", () => {
        expect(object3d.rotation.x).to.equal(sphere.orientation.xAngle);
        expect(object3d.rotation.y).to.equal(sphere.orientation.yAngle);
        expect(object3d.rotation.z).to.equal(sphere.orientation.zAngle);
    });

    it("Object3D's id should match the model.", () => {
        expect(object3d.userData.id).to.equal(sphere.id);
    });
});

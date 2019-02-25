import { expect } from "chai";
import { ICommonCylinder } from "../../../../../../../common/model/scene/objects/geometricObjects/cylinder";
import { GeometricShapeType } from "../../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ObjectType } from "../../../../../../../common/model/scene/scene";
import { CylinderFactory } from "./cylinderFactory";

describe("CylinderFactory", () => {
    const factory: CylinderFactory = new CylinderFactory();

    const cylinder: ICommonCylinder = {
        radius: 6,
        height: 11,
        color: 0x123,
        shapeType: GeometricShapeType.CONE,
        id: "ababa124",
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

    const object3d: THREE.Object3D = factory.parse(cylinder);

    it("Object3D positions should match the model.", () => {
        expect(object3d.position.x).to.equal(cylinder.position.x);
        expect(object3d.position.y).to.equal(cylinder.position.y);
        expect(object3d.position.z).to.equal(cylinder.position.z);
    });

    it("Object3D rotation should match the model.", () => {
        expect(object3d.rotation.x).to.equal(cylinder.orientation.xAngle);
        expect(object3d.rotation.y).to.equal(cylinder.orientation.yAngle);
        expect(object3d.rotation.z).to.equal(cylinder.orientation.zAngle);
    });

    it("Object3D's id should match the model.", () => {
        expect(object3d.userData.id).to.equal(cylinder.id);
    });
});

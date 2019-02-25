import { expect } from "chai";
import { GeometricShapeType } from "../../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ICommonPyramid } from "../../../../../../../common/model/scene/objects/geometricObjects/pyramid";
import { ObjectType } from "../../../../../../../common/model/scene/scene";
import { PyramidFactory } from "./pyramidFactory";

describe("PyramidFactory", () => {
    const factory: PyramidFactory = new PyramidFactory();

    const pyramid: ICommonPyramid = {
        radiusBase: 5,
        height: 9,
        color: 0x123,
        shapeType: GeometricShapeType.CONE,
        id: "ababgdg234",
        orientation: {
            xAngle: 7,
            yAngle: 7,
            zAngle: 7,
        },
        position: {
            x: 160,
            y: 28,
            z: 120,
        },
        type: ObjectType.Geometric,
    };

    const object3d: THREE.Object3D = factory.parse(pyramid);

    it("Object3D positions should match the model.", () => {
        expect(object3d.position.x).to.equal(pyramid.position.x);
        expect(object3d.position.y).to.equal(pyramid.position.y);
        expect(object3d.position.z).to.equal(pyramid.position.z);
    });

    it("Object3D rotation should match the model.", () => {
        expect(object3d.rotation.x).to.equal(pyramid.orientation.xAngle);
        expect(object3d.rotation.y).to.equal(pyramid.orientation.yAngle);
        expect(object3d.rotation.z).to.equal(pyramid.orientation.zAngle);
    });

    it("Object3D's id should match the model.", () => {
        expect(object3d.userData.id).to.equal(pyramid.id);
    });
});

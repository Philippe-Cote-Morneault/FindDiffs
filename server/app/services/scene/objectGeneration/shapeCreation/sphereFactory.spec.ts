import { expect } from "chai";
import * as sinon from "sinon";
import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { GeometricShapeType, ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { GeometricObjectGenerator } from "./geometricObjectGenerator";
import { SphereFactory } from "./sphereFactory";
describe("SphereFactory", () => {

    beforeEach(() => {
        sinon.stub(Math, "random");
    });
    afterEach(() => {
        (Math.random as sinon.SinonStub).restore();
    });

    describe("createShape()", () => {
        it("Should return a sphere", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.8);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const position: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(position);
            expect(object.shapeType).to.equal(GeometricShapeType.SPHERE);
        });

        it("Should return a sphere with a radius in range", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.5);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const position: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(position);
            expect(object["radius"]).to.be
            .lte((SphereFactory.SIZE_MAX_PERCENTAGE / SphereFactory.PERCENTAGE_DIVISION) * SphereFactory.REFERENCE_RADIUS)
            .and.gte((SphereFactory.SIZE_MIN_PERCENTAGE / SphereFactory.PERCENTAGE_DIVISION) * SphereFactory.REFERENCE_RADIUS);
        });
    });
});

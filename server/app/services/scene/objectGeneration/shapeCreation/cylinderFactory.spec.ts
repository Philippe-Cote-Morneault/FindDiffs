import { expect } from "chai";
import * as sinon from "sinon";
import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { GeometricShapeType, ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { CylinderFactory } from "./cylinderFactory";
import { GeometricObjectGenerator } from "./geometricObjectGenerator";
describe("CylinderFactory", () => {

    beforeEach(() => {
        sinon.stub(Math, "random");
    });
    afterEach(() => {
        (Math.random as sinon.SinonStub).restore();
    });

    describe("createShape()", () => {
        it("Should return a cylinder", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.5);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const position: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(position);
            expect(object.shapeType).to.equal(GeometricShapeType.CYLINDER);
        });

        it("Should return a cylinder with a radius in range", () => {
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
            .lte((CylinderFactory.SIZE_MAX_PERCENTAGE / CylinderFactory.PERCENTAGE_DIVISION) * CylinderFactory.REFERENCE_RADIUS)
            .and.gte((CylinderFactory.SIZE_MIN_PERCENTAGE / CylinderFactory.PERCENTAGE_DIVISION) * CylinderFactory.REFERENCE_RADIUS);
        });

        it("Should return a cylinder with a height in range", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.5);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const position: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(position);
            expect(object["height"]).to.be
            .lte((CylinderFactory.SIZE_MAX_PERCENTAGE / CylinderFactory.PERCENTAGE_DIVISION) * CylinderFactory.REFERENCE_HEIGHT)
            .and.gte((CylinderFactory.SIZE_MIN_PERCENTAGE / CylinderFactory.PERCENTAGE_DIVISION) * CylinderFactory.REFERENCE_HEIGHT);
        });
    });
});

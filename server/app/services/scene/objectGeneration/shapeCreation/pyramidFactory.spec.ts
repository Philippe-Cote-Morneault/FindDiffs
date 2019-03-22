import { expect } from "chai";
import * as sinon from "sinon";
import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { GeometricShapeType, ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { GeometricObjectGenerator } from "./geometricObjectGenerator";
import { PyramidFactory } from "./pyramidFactory";
describe("PyramidFactory", () => {

    beforeEach(() => {
        sinon.stub(Math, "random");
    });
    afterEach(() => {
        (Math.random as sinon.SinonStub).restore();
    });

    describe("createShape()", () => {
        it("Should create an object which is a pyramid", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.6);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const position: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(position);
            expect(object.shapeType).to.equal(GeometricShapeType.TRIANGULAR_BASE_PYRAMID);
        });

        it("Should create a pyramid with a radius in the specified range", () => {
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
            .lte((PyramidFactory.SIZE_MAX_PERCENTAGE / PyramidFactory.PERCENTAGE_DIVISION) * PyramidFactory.REFERENCE_RADIUS)
            .and.gte((PyramidFactory.SIZE_MIN_PERCENTAGE / PyramidFactory.PERCENTAGE_DIVISION) * PyramidFactory.REFERENCE_RADIUS);
        });

        it("Should create a pyramid with a height in the specifed range", () => {
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
            .lte((PyramidFactory.SIZE_MAX_PERCENTAGE / PyramidFactory.PERCENTAGE_DIVISION) * PyramidFactory.REFERENCE_HEIGHT)
            .and.gte((PyramidFactory.SIZE_MIN_PERCENTAGE / PyramidFactory.PERCENTAGE_DIVISION) * PyramidFactory.REFERENCE_HEIGHT);
        });
    });
});

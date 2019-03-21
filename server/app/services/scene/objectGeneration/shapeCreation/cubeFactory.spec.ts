import { expect } from "chai";
import * as sinon from "sinon";
import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { GeometricShapeType, ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { CubeFactory } from "./cubeFactory";
import { GeometricObjectGenerator } from "./geometricObjectGenerator";
describe("CubeFactory", () => {

    beforeEach(() => {
        sinon.stub(Math, "random");
    });
    afterEach(() => {
        (Math.random as sinon.SinonStub).restore();
    });

    describe("createShape()", () => {
        it("Should create an object which is a cube", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.1);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const position: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(position);
            expect(object.shapeType).to.equal(GeometricShapeType.CUBE);
        });

        it("Should create a cube with a width in the specified range", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.1);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const position: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(position);
            expect(object["width"]).to.be
            .lte((CubeFactory.SIZE_MAX_PERCENTAGE / CubeFactory.PERCENTAGE_DIVISION) * CubeFactory.REFERENCE_WIDTH)
            .and.gte((CubeFactory.SIZE_MIN_PERCENTAGE / CubeFactory.PERCENTAGE_DIVISION) * CubeFactory.REFERENCE_WIDTH);
        });
    });
});

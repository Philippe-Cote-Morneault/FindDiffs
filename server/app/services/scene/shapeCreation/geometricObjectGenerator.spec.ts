import { expect } from "chai";
import * as sinon from "sinon";
import { ICommon3DPosition } from "../../../../../common/model/positions";
import { GeometricObjectGenerator } from "./geometricObjectGenerator";
import { ICommonGeometricObject, GeometricShapeType } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";

describe("GeometricObjectGenerator", () => {
    describe("createObject()", () => {
        beforeEach(() => {
            sinon.stub(Math, "random");
        });
        afterEach(() => {
            (Math.random as sinon.SinonStub).restore();
        });
        it("Should return a cube 1/7 of the time", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.5);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const posititon: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(posititon);
            expect(object.shapeType).to.equal(GeometricShapeType.CYLINDER);
        });
    });
});

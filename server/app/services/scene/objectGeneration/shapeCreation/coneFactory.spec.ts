import { expect } from "chai";
import * as sinon from "sinon";
import { ICommon3DPosition } from "../../../../../../common/model/positions";
import { GeometricShapeType, ICommonGeometricObject } from "../../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { ConeFactory } from "./coneFactory";
import { GeometricObjectGenerator } from "./geometricObjectGenerator";
describe("ConeFactory", () => {

    beforeEach(() => {
        sinon.stub(Math, "random");
    });
    afterEach(() => {
        (Math.random as sinon.SinonStub).restore();
    });

    describe("createShape()", () => {
        it("Should return a cone", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.2);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const position: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(position);
            expect(object.shapeType).to.equal(GeometricShapeType.CONE);
        });

        it("Should return a cone with a radius in range", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.2);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const position: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(position);
            expect(object["radius"]).to.be
            .lte((ConeFactory.SIZE_MAX_PERCENTAGE / ConeFactory.PERCENTAGE_DIVISION) * ConeFactory.REFERENCE_RADIUS)
            .and.gte((ConeFactory.SIZE_MIN_PERCENTAGE / ConeFactory.PERCENTAGE_DIVISION) * ConeFactory.REFERENCE_RADIUS);
        });

        it("Should return a cone with a height in range", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.2);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const position: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(position);
            expect(object["height"]).to.be
            .lte((ConeFactory.SIZE_MAX_PERCENTAGE / ConeFactory.PERCENTAGE_DIVISION) * ConeFactory.REFERENCE_HEIGHT)
            .and.gte((ConeFactory.SIZE_MIN_PERCENTAGE / ConeFactory.PERCENTAGE_DIVISION) * ConeFactory.REFERENCE_HEIGHT);
        });
    });
});

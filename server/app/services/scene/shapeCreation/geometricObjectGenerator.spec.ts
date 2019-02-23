import { expect } from "chai";
import * as sinon from "sinon";
import { ICommon3DPosition } from "../../../../../common/model/positions";
import { GeometricShapeType, ICommonGeometricObject } from "../../../../../common/model/scene/objects/geometricObjects/geometricObject";
import { GeometricObjectGenerator } from "./geometricObjectGenerator";

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
            (Math.random as sinon.SinonStub).returns(0.1);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const posititon: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(posititon);
            expect(object.shapeType).to.equal(GeometricShapeType.CUBE);
        });
        it("Should return a cone 1/7 of the time", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.2);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const posititon: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(posititon);
            expect(object.shapeType).to.equal(GeometricShapeType.CONE);
        });
        it("Should return a cylinder 1/7 of the time", () => {
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
        it("Should return a pyramid 1/7 of the time", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.6);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const posititon: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(posititon);
            expect(object.shapeType).to.equal(GeometricShapeType.TRIANGULAR_BASE_PYRAMID);
        });
        it("Should return a sphere 1/7 of the time", () => {
            // tslint:disable-next-line:no-magic-numbers
            (Math.random as sinon.SinonStub).returns(0.8);
            const generator: GeometricObjectGenerator = new GeometricObjectGenerator();
            const posititon: ICommon3DPosition = {
                x: 0,
                y: 0,
                z: 0,
            };
            const object: ICommonGeometricObject =  generator.createObject(posititon);
            expect(object.shapeType).to.equal(GeometricShapeType.SPHERE);
        });
        it("Should return the same instance of GeometricObjectGenerator", () => {
            const generator: GeometricObjectGenerator = GeometricObjectGenerator.getInstance();
            const returnedInstance: GeometricObjectGenerator = GeometricObjectGenerator.getInstance();

            expect(generator).to.equal(returnedInstance);
        });
    });
});

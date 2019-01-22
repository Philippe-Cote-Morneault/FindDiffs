import {expect} from "chai";
import { COLOR, Pixel, Position } from "../../model/bitmap/pixel";
import { Painter } from "./painter";

/* tslint:disable no-shadowed-variable */
describe("DifferenceGenerator - Painter", () => {
    describe("drawPixel()", () => {
        it("The pixel should be black on the canvas", () => {
            const pixel: Pixel[] = new Array<Pixel>(1);
            pixel.fill(Pixel.fromColor(COLOR.WHITE));

            const painter: Painter = new Painter(1, 1);
            painter.drawPixel(pixel, new Position(0, 0));

            // Is the pixel black ?
            expect(pixel[0].equals(Pixel.fromColor(COLOR.BLACK))).to.equal(true);
        });
        it("A pixel should be painted on the canvas (bigger)", () => {
            const width: number = 5;
            const height: number = 5;
            const pixels: Pixel[] = new Array<Pixel>(width * height);
            pixels.fill(Pixel.fromColor(COLOR.WHITE));

            const painter: Painter = new Painter(width, height);
            painter.drawPixel(pixels, new Position(width - 1, 0));

            const changedPixel: number = 4;
            expect(pixels[changedPixel].equals(Pixel.fromColor(COLOR.BLACK))).to.equal(true);
        });

        const width: number = 2;
        const height: number = 2;
        const whitePixels: Pixel[] = new Array<Pixel>(width * height);
        whitePixels.fill(Pixel.fromColor(COLOR.WHITE));
        const whitePixelsRef: Pixel[] = whitePixels.slice();

        it("The pixel should not be painted if out of bound min in x", () => {
            whitePixels.fill(Pixel.fromColor(COLOR.WHITE));

            const painter: Painter = new Painter(width, height);
            painter.drawPixel(whitePixels, new Position(-1, 1));

            expect(whitePixels).to.eql(whitePixelsRef);
        });

        it("The pixel should not be painted if out of bound min in y", () => {
            whitePixels.fill(Pixel.fromColor(COLOR.WHITE));

            const painter: Painter = new Painter(width, height);
            painter.drawPixel(whitePixels, new Position(1, -1));

            expect(whitePixels).to.eql(whitePixelsRef);
        });

        it("The pixel should not be painted if out of bound max in x", () => {
            whitePixels.fill(Pixel.fromColor(COLOR.WHITE));

            const painter: Painter = new Painter(width, height);
            painter.drawPixel(whitePixels, new Position(width, 1));

            expect(whitePixels).to.eql(whitePixelsRef);
        });

        it("The pixel should not be painted if out of bound max in y", () => {
            whitePixels.fill(Pixel.fromColor(COLOR.WHITE));

            const painter: Painter = new Painter(width, height);
            painter.drawPixel(whitePixels, new Position(1, height));

            expect(whitePixels).to.eql(whitePixelsRef);
        });
    });

});

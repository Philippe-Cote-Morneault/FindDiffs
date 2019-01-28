import {expect} from "chai";
import { COLOR, Pixel, Position } from "../../model/bitmap/pixel";
import { Painter } from "./painter";

/* tslint:disable no-shadowed-variable no-magic-numbers */
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

        it("The pixel should not be painted if not in bound", () => {
            whitePixels.fill(Pixel.fromColor(COLOR.WHITE));

            const painter: Painter = new Painter(width, height);
            painter.drawPixel(whitePixels, new Position(-1, 1));

            expect(whitePixels).to.eql(whitePixelsRef);
        });

    });
    describe("enlargePixel()", () => {
        it("Testing brush pattern 1", () => {
            const width: number = 5;
            const height: number = 5;
            const pixels: Pixel[] = new Array<Pixel>(width * height);
            pixels.fill(Pixel.fromColor(COLOR.WHITE));

            const pixelsRef: Pixel[] = pixels.slice();
            pixelsRef.fill(Pixel.fromColor(COLOR.BLACK));

            const painter: Painter = new Painter(width, height);
            painter.enlargePixel(pixels, new Position(2, 2).getIndex(width));

            expect(pixels).to.eql(pixelsRef);
        });

        it("Testing brush pattern 2", () => {
            const width: number = 7;
            const height: number = 7;
            const pixels: Pixel[] = new Array<Pixel>(width * height);
            pixels.fill(Pixel.fromColor(COLOR.WHITE));

            const pixelsRef: Pixel[] = pixels.slice();
            pixelsRef.fill(Pixel.fromColor(COLOR.BLACK));

            const painter: Painter = new Painter(width, height);
            painter.enlargePixel(pixels, new Position(3, 3).getIndex(width));

            const whitePixels: number[] = [0, 1, 5, 6, 7, 13, 35, 41, 42, 43, 47, 48];

            for (let i: number = 0; i < pixelsRef.length; i++ ) {
                if (whitePixels.indexOf(i) !== -1) {
                    pixelsRef[i] = Pixel.fromColor(COLOR.WHITE);
                }
            }

            expect(pixels).to.eql(pixelsRef);
        });
    });

});

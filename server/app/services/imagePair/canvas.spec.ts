import {expect} from "chai";
import { COLOR, Pixel, Position } from "../../model/bitmap/pixel";
import { Canvas } from "./canvas";

/* tslint:disable no-shadowed-variable no-magic-numbers */
describe("DifferenceGenerator - Canvas", () => {
    describe("drawPixel()", () => {
        it("Should be a black pixel on the canvas when painting a black pixel", () => {
            const pixel: Pixel[] = new Array<Pixel>(1);
            pixel.fill(Pixel.fromColor(COLOR.WHITE));

            const canvas: Canvas = new Canvas(1, 1);
            canvas.drawPixel(pixel, new Position(0, 0));

            // Is the pixel black ?
            expect(pixel[0].equals(Pixel.fromColor(COLOR.BLACK))).to.equal(true);
        });
        it("Should have many black pixels on the canvas (bigger) when painting a few pixels", () => {
            const width: number = 5;
            const height: number = 5;
            const pixels: Pixel[] = new Array<Pixel>(width * height);
            pixels.fill(Pixel.fromColor(COLOR.WHITE));

            const canvas: Canvas = new Canvas(width, height);
            canvas.drawPixel(pixels, new Position(width - 1, 0));

            const changedPixel: number = 4;
            expect(pixels[changedPixel].equals(Pixel.fromColor(COLOR.BLACK))).to.equal(true);
        });

        const width: number = 2;
        const height: number = 2;
        const whitePixels: Pixel[] = new Array<Pixel>(width * height);
        whitePixels.fill(Pixel.fromColor(COLOR.WHITE));
        const whitePixelsRef: Pixel[] = whitePixels.slice();

        it("Should not paint the pixel if not inbound", () => {
            whitePixels.fill(Pixel.fromColor(COLOR.WHITE));

            const canvas: Canvas = new Canvas(width, height);
            canvas.drawPixel(whitePixels, new Position(-1, 1));

            expect(whitePixels).to.eql(whitePixelsRef);
        });

    });
    describe("enlargePixel()", () => {
        it("Should be able to reproduce brush pattern 1", () => {
            const width: number = 5;
            const height: number = 5;
            const pixels: Pixel[] = new Array<Pixel>(width * height);
            pixels.fill(Pixel.fromColor(COLOR.WHITE));

            const pixelsRef: Pixel[] = pixels.slice();
            pixelsRef.fill(Pixel.fromColor(COLOR.BLACK));

            const canvas: Canvas = new Canvas(width, height);
            canvas.enlargePixel(pixels, new Position(2, 2).getIndex(width));

            expect(pixels).to.eql(pixelsRef);
        });

        it("Should be able to reproduce brush pattern 2", () => {
            const width: number = 7;
            const height: number = 7;
            const pixels: Pixel[] = new Array<Pixel>(width * height);
            pixels.fill(Pixel.fromColor(COLOR.WHITE));

            const pixelsRef: Pixel[] = pixels.slice();
            pixelsRef.fill(Pixel.fromColor(COLOR.BLACK));

            const canvas: Canvas = new Canvas(width, height);
            canvas.enlargePixel(pixels, new Position(3, 3).getIndex(width));

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

import {Bitmap} from 'bitmap-ts';

const IMAGE_HEIGHT: number = 480;
const IMAGE_WIDTH: number = 640;
const RBGA_COLOR_WHITE = 255;

class RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor() {
      this.r = this.g = this.b = this.a = 0;
    }
  }
 
export class DifferenceImageGenerator {
    private originalImage: Bitmap;
    private modifiedImage: Bitmap;
    private imageName: string;

    constructor(originalImage: Bitmap, modifiedImage: Bitmap, imageName: string) { 
        this.originalImage = originalImage;
        this.modifiedImage = modifiedImage;
        this.imageName = imageName;
        originalImage.currentData[0]
    }

    public getDifferenceImage(): File {
        let returnFile: File = new File([], this.imageName);
        let resultBitmap: Bitmap = new Bitmap(returnFile);
        let originalImageData = this.originalImage.currentData();
        let modifiedImageData = this.modifiedImage.currentData();

        for(let y = 0; y < IMAGE_HEIGHT; ++y) {
            for (let x = 0; x < IMAGE_WIDTH; ++x) {
                let location = y * IMAGE_WIDTH * 3 + x * 3;
            }
        }

        return returnFile;
    }
}
import {Bitmap} from 'bitmap-ts';
 
export class DifferenceImageGenerator {
    private originalImage: Bitmap;
    private modifiedImage: Bitmap;

    constructor(originalImage: Bitmap, modifiedImage: Bitmap) { 
        this.originalImage = originalImage;
        this.modifiedImage = modifiedImage;
    }
}
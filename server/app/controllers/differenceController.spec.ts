import { DifferenceController } from './differenceController';
import {expect} from 'chai';
import { mockReq } from 'sinon-express-mock'


describe('DifferenceController', () => {
    let differenceController = new DifferenceController();
    
    it('If body is empty, should return an error', () => {
        const request = {
            body: {
            }
        };
        const response = differenceController.genDifference(mockReq(request));
        const errorMessage = "Le nom est manquant (name)";
        expect(response).to.equal(differenceController.printError(errorMessage));
    });
    
    it("If body does not contain an original image return an error", () => {
        const request = {
            body: {
                name:"bob"
            }
        };
        const response = differenceController.genDifference(mockReq(request));
        const errorMessage = "L'image originale est manquante (originalImage)";
        expect(response).to.equal(differenceController.printError(errorMessage));
    });

    it("If body does not contain a modified image return an error", () =>{
        const request = {
            body:{
                name:"bob",
                originalImage: "image",
            }
        }
        const response = differenceController.genDifference(mockReq(request));
        const errorMessage = "L'image modifié est manquante (modifiedImage)";
        expect(response).to.equal(differenceController.printError(errorMessage));
    });
    
});

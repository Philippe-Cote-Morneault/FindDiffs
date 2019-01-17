import { ControllerDifference } from './controllerDifference';
import {expect} from 'chai';
import { mockReq } from 'sinon-express-mock'


describe('ControllerDifference', () => {
    let controllerDifference = new ControllerDifference();
    
    it('If body is empty, should return an error', () => {
        const request = {
            body: {
            }
        };
        const response = controllerDifference.genDifference(mockReq(request));
        const errorMessage = "Le nom est manquant (name)";
        expect(response).to.equal(controllerDifference.printError(errorMessage));
    });
    
    it("If body does not contain an original image return an error", () => {
        const request = {
            body: {
                name:"bob"
            }
        };
        const response = controllerDifference.genDifference(mockReq(request));
        const errorMessage = "L'image originale est manquante (originalImage)";
        expect(response).to.equal(controllerDifference.printError(errorMessage));
    });

    it("If body does not contain a modified image return an error", () =>{
        const request = {
            body:{
                name:"bob",
                originalImage: "image",
            }
        }
        const response = controllerDifference.genDifference(mockReq(request));
        const errorMessage = "L'image modifié est manquante (modifiedImage)";
        expect(response).to.equal(controllerDifference.printError(errorMessage));
    });
    
});

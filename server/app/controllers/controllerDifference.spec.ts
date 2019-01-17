import { ControllerDifference } from './controllerDifference';
import { Message } from "../../../common/communication/message";
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
        
        const message: Message = {
            title: "Erreur",
            body: "Le nom est manquant (name)"
        }
        expect(response).to.equal(JSON.stringify(message));
    });
    
});

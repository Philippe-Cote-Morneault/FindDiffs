import { InitialViewService } from './initial-view.service';
import {expect} from 'chai';

let initialViewService : InitialViewService;
describe('InitialViewService', () => {

  it('Should return true if input empty', () => {
    let emptyString = "";
    expect(initialViewService.isNotEmpty(emptyString)).to.equal(true);
  });

  
});

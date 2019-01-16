import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitialViewService {

  constructor() { }

  verifyUsernameService(username: string){
    
    if (this.isNotEmpty(username)){
      if (this.isAlphaNumeric(username) && this.isCorrectLength(username)){
        console.log(username);
      }
    }
  }

  isNotEmpty(username:string){
    let emptyString = "";
    return (username != emptyString);
  }
 
  isAlphaNumeric(username:string){
    let lowerCaseUsername = username.toLowerCase();
    for(let i=0; i<lowerCaseUsername.length; i++){
      if (!this.isAlpha(lowerCaseUsername[i]) || !this.isNumeric(lowerCaseUsername[i])){
        return false;
      }
    }
    return true;
  }

  isAlpha(letter: string){
    const MAX_VALUE = 123;
    const MIN_VALUE = 96;
    return (Number(letter)<MAX_VALUE && Number(letter)>MIN_VALUE)
  }

  isNumeric(letter: string){
    const MAX_VALUE = 58;
    const MIN_VALUE = 47;
    return (Number(letter)<MAX_VALUE && Number(letter)>MIN_VALUE)
  }

  isCorrectLength(username:string){
    const MAX_VALUE = 13;
    const MIN_VALUE = 2;
    return (username.length < MAX_VALUE && username.length < MIN_VALUE);
  }
}

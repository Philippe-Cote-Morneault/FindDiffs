import { Request, Response, NextFunction } from "express";
import { Message } from "../../../common/communication/message";
import "reflect-metadata";
import { injectable, } from "inversify";

@injectable()
export class UsernameValidation {
    private usernameArray : string[] = [];
    public verifyUsername(req: Request, res: Response, next: NextFunction): void {
        let username = req.params.username;
        let messageTitle = "VerifyUsername";
        if (!this.isEmpty(username)){
            if (this.isAlphaNumeric(username) && this.isCorrectLength(username)){
                if (this.isAvailable(username,this.usernameArray)){
                    this.add(username,this.usernameArray);
                    const message: Message = {
                        title: messageTitle,
                        body: username
                    }
                    res.send(JSON.stringify(message));
                 }
            }
        }
    }
    public add(username:string, usernameArray:string[]): void{
        usernameArray[usernameArray.length] = username;
    }
    public isAvailable(username:string, usernameArray:string[]): boolean{
        if (!this.isArrayEmpty(usernameArray)){
            for(let i=0; i< usernameArray.length; i++){
                if (usernameArray[i]==username){
                    return false;
                }
            }
        }
        return true;
    }

    public isArrayEmpty(usernameArray:string[]): boolean{
        let emptyLength = 0;
        return (usernameArray.length==emptyLength);
    }

    public isEmpty(username:string): boolean{
        let emptyString = "";
        return (username==emptyString);
    }
    
    public isAlphaNumeric(username:string): boolean{
        let lowerCaseUsername = username.toLowerCase();
        for(let i=0; i<lowerCaseUsername.length; i++){
            if (!this.isAlpha(lowerCaseUsername[i]) && !this.isNumeric(lowerCaseUsername[i])){
                return false;
            }
        }
        return true;
    }

    public isAlpha(letter: string): boolean{
        const MAX_VALUE = 122;
        const MIN_VALUE = 97;
        return (letter.charCodeAt(0)<=MAX_VALUE && letter.charCodeAt(0)>=MIN_VALUE)
    }

    public isNumeric(letter: string): boolean{
        const MAX_VALUE = 58;
        const MIN_VALUE = 47;
        return (letter.charCodeAt(0)<MAX_VALUE && letter.charCodeAt(0)>MIN_VALUE)
    }

    public isCorrectLength(username:string): boolean{
        const MAX_VALUE = 13;
        const MIN_VALUE = 2;
        return (username.length < MAX_VALUE && username.length > MIN_VALUE);
    }
}

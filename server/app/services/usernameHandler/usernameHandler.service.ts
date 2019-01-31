import { Request, Response } from "express";
import "reflect-metadata";
import { Message } from "../../../../common/communication/message";

export class UsernameHandler {
    public usernameArray: string[] = [];
    public deleteUsername(req: Request): void {
        const username: string = req.params.username;
        const index: number = this.usernameArray.indexOf(username);
        this.usernameArray.splice(index);
    }

    public verifyUsername(req: Request, res: Response): void {
        const username: string = req.params.username;
        const messageTitle: string = "VerifyUsername";
        if (!this.isEmpty(username)) {
            if (this.isAlphaNumeric(username) && this.isCorrectLength(username)) {
                if (this.isAvailable(username, this.usernameArray)) {
                    this.add(username, this.usernameArray);
                    const message: Message = {
                        title: messageTitle,
                        body: username,
                    };
                    res.send(JSON.stringify(message));
                 }
            }
        }
    }
    public add(username: string, usernameArray: string[]): void {
        usernameArray[usernameArray.length] = username;
    }
    public isAvailable(username: string, usernameArray: string[]): boolean {
        if (!this.isArrayEmpty(usernameArray)) {
            for (let i = 0; i < usernameArray.length; i++) {
                if (usernameArray[i] === username) {

                    return false;
                }
            }
        }

        return true;
    }

    public isArrayEmpty(usernameArray: string[]): boolean {
        const emptyLength: Number = 0;

        return (usernameArray.length === emptyLength);
    }

    public isEmpty(username: string): boolean {
        const emptyString: String = "";

        return (username === emptyString);
    }

    public isAlphaNumeric(username: string): boolean {
        const lowerCaseUsername: string = username.toLowerCase();
        for(let i = 0; i < lowerCaseUsername.length; i++){
            if (!this.isAlpha(lowerCaseUsername[i]) && !this.isNumeric(lowerCaseUsername[i])) {
                return false;
            }
        }

        return true;
    }

    public isAlpha(letter: string): boolean {
        const MAX_VALUE: Number = 122;
        const MIN_VALUE: Number = 97;

        return (letter.charCodeAt(0) <= MAX_VALUE && letter.charCodeAt(0) >= MIN_VALUE);
    }

    public isNumeric(letter: string): boolean {
        const MAX_VALUE: Number = 58;
        const MIN_VALUE: Number = 47;

        return (letter.charCodeAt(0) < MAX_VALUE && letter.charCodeAt(0) > MIN_VALUE);
    }

    public isCorrectLength(username: string): boolean {
        const MAX_VALUE: Number = 13;
        const MIN_VALUE: Number = 2;

        return (username.length < MAX_VALUE && username.length > MIN_VALUE);
    }
}

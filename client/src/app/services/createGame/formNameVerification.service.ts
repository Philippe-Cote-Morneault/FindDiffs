import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class FormNameVerificationService {
    public isNameValid(name: string): boolean {
        const validationRegex: string = "^[a-zA-Z0-9]{3,12}$";
        const nameValidationRegex: RegExp = new RegExp(validationRegex);

        return nameValidationRegex.test(name);
    }

}

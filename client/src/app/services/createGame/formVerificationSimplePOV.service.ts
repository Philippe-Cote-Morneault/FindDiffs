import { Injectable } from "@angular/core";
import { FormNameVerificationService } from "./formNameVerification.service";

@Injectable({
    providedIn: "root",
})
export class FormVerificationSimplePOVService extends FormNameVerificationService {
    private static readonly ORIGINAL_FIELD: number = 3;
    private static readonly MODIFIED_FIELD: number = 4;

    public constructor() {
        super();
    }
    public isOriginalFileValid(fromValidation: boolean[]): boolean {

        return fromValidation[FormVerificationSimplePOVService.ORIGINAL_FIELD];
    }

    public isModifiedFileValid(fromValidation: boolean[]): boolean {

        return fromValidation[FormVerificationSimplePOVService.MODIFIED_FIELD];
    }

    public verifyInfo(fromValidation: boolean[]): boolean {
        return fromValidation.every((value) => value);
    }
}

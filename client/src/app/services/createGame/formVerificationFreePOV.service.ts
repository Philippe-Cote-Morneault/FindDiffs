import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class FormVerificationFreePOVService {
    private static readonly MAX_QTE: number = 201;
    private static readonly MIN_QTE: number = 9;
    // tslint:disable:no-any
    public isNameValid(name: string): boolean {
        const validationRegex: string = "^[a-zA-Z0-9]{3,12}$";
        const nameValidationRegex: RegExp = new RegExp(validationRegex);

        return nameValidationRegex.test(name);
    }

    public isModificationTypeValid(isAddType: boolean, isRemoveType: boolean, isModifiedType: boolean): boolean {

        return isAddType || isRemoveType || isModifiedType;
    }

    public isQuantityValid(quantity: number): boolean {

        return !isNaN(quantity) && quantity > FormVerificationFreePOVService.MIN_QTE && quantity < FormVerificationFreePOVService.MAX_QTE;
    }
}

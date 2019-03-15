import { Injectable } from "@angular/core";
import { FormNameVerificationService } from "./formNameVerification.service";

@Injectable({
    providedIn: "root",
})
export class FormVerificationFreePOVService extends FormNameVerificationService {
    private static readonly MAX_QTE: number = 201;
    private static readonly MIN_QTE: number = 9;

    public constructor() {
        super();
    }

    public isModificationTypeValid(isAddType: boolean, isRemoveType: boolean, isModifiedType: boolean): boolean {

        return isAddType || isRemoveType || isModifiedType;
    }

    public isQuantityValid(quantity: number): boolean {

        return !isNaN(quantity) && quantity > FormVerificationFreePOVService.MIN_QTE && quantity < FormVerificationFreePOVService.MAX_QTE;
    }
}

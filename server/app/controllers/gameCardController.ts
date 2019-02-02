import { Request } from "express";
import { InvalidFormatException } from "../../../common/errors/invalidFormatException";
export class GameCardController {

    private validateGameCard(req: Request): void {
        if (!req.body.name || req.body.name.lenght === 0) {
            throw new InvalidFormatException("You must put a name on the gamecard.");
        }

        if (!req.body.pov) {
            throw new InvalidFormatException("You must put a pov on the gamecard.");
        }

        if (!req.body["image-pair-id"]) {
            throw new InvalidFormatException("You must set an image pair id");
        }

        // TODO check image pair id;
    }

    public postGameCard(req: Request): string {
        try {
            this.validateGameCard(req);
        } catch (error) {
            return JSON.stringify(error.Message);
        }

        // TODO database call
        return "";
    }
};

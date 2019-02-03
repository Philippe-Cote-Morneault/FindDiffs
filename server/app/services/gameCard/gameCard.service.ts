import Axios, { AxiosResponse } from "axios";
import { Request } from "express";
import "reflect-metadata";
import { Message } from "../../../../common/communication/message";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { ICommonImagePair } from "../../../../common/model/imagePair";
import Config from "../../config";
import { GameCard, IGameCard } from "../../model/schemas/gameCard";
import { EnumUtils } from "../../utils/enumUtils";
import { IGameCardService } from "../interfaces";
import { Service } from "../service";

export class GameCardService extends Service implements IGameCardService {

    private validatePost(req: Request): void {
        if (!req.body.name) {
            throw new InvalidFormatException("The field name is not present.");
        }

        if (!req.body["image-pair-id"]) {
            throw new InvalidFormatException("The field image-pair-id is not present.");
        }

        if (!req.body.pov) {
            throw new InvalidFormatException("The field pov is not present.");
        }

        if (!EnumUtils.isStringInEnum(req.body.pov, POVType)) {
            throw new InvalidFormatException("The pov type is not recognized.");
        }
    }

    public async post(req: Request): Promise<string> {
        this.validatePost(req);
        const imagePair: ICommonImagePair = await this.getImagePairId(req.body["image-pair-id"]);
        const gameCard: IGameCard = new GameCard({
            pov: req.body.pov,
            title: req.body.name,
            imagePairId: imagePair.id,
            best_time_solo: [0, 0, 0],
            best_time_online: [0, 0, 0],
            creation_date: new Date(),
        });
        await gameCard.save();

        return JSON.stringify(this.getCommonGameCard(gameCard, imagePair));
    }

    public async index(): Promise<string> {
        return GameCard.find({}).select("+imagePairId").then(async (docs: IGameCard[]) => {
            const gameCards: ICommonGameCard[] = new Array<ICommonGameCard>();

            const promises: Promise<void>[] = docs.map(async(doc: IGameCard) => {
                const imagePair: ICommonImagePair = await this.getImagePairId(doc.imagePairId);
                gameCards.push(this.getCommonGameCard(doc, imagePair));
            });
            await Promise.all(promises);

            return JSON.stringify(gameCards);

        });
    }

    public async single(id: string): Promise<string> {
        return GameCard.findById(id).select("+imagePairId")
        .then(async(doc: IGameCard) => {
            const imagePair: ICommonImagePair = await this.getImagePairId(doc.imagePairId);

            return JSON.stringify(this.getCommonGameCard(doc, imagePair));
        })
        .catch((err: Error) => {
            throw new NotFoundException("The id could not be found.");
        });
    }

    public async delete(id: string): Promise<string> {
        return GameCard.findById(id)
        .then(async (doc: IGameCard) => {
            await doc.remove();
            const message: Message = {
                title: "Success",
                body: "The gamecard was deleted.",
            };

            return JSON.stringify(message); })
        .catch((error: Error) => {
            throw new NotFoundException("The id could not be found.");
        });
    }

    private async getImagePairId(id: string): Promise<ICommonImagePair> {
        return Axios.get<ICommonImagePair>(`http://${Config.hostname}:${Config.port}/image-pair/${id}`)
        .then((response: AxiosResponse<ICommonImagePair>) => {
            return response.data;
        })
        .catch(() => {
            throw new NotFoundException("The image id could not be found.");
        });
    }

    private getCommonGameCard(mongooseGameCard: IGameCard, imagePair: ICommonImagePair): ICommonGameCard {
        const response: ICommonGameCard = JSON.parse(JSON.stringify(mongooseGameCard));
        response.image_pair = imagePair;
        delete response["imagePairId"];

        return response;
    }
}

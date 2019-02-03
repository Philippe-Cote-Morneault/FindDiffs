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
import { _e, R } from "../../strings";
import { EnumUtils } from "../../utils/enumUtils";
import { IGameCardService } from "../interfaces";
import { Service } from "../service";
import { ScoreGenerator } from "./scoreGenerator";

export class GameCardService extends Service implements IGameCardService {

    public readonly DEFAULT_SCORE_NUMBER: number = 3;

    private validatePost(req: Request): void {
        if (!req.body.name) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.NAME_]));
        }

        if (!req.body["image-pair-id"]) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.PAIR_]));
        }

        if (!req.body.pov) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.POV_]));
        }

        if (!EnumUtils.isStringInEnum(req.body.pov, POVType)) {
            throw new InvalidFormatException(_e(R.ERROR_WRONG_TYPE, [R.POV_]));
        }
    }

    public async post(req: Request): Promise<string> {
        this.validatePost(req);
        const imagePair: ICommonImagePair = await this.getImagePairId(req.body["image-pair-id"]);
        const gameCard: IGameCard = new GameCard({
            pov: req.body.pov,
            title: req.body.name,
            imagePairId: imagePair.id,
            best_time_solo: ScoreGenerator.generateScore(this.DEFAULT_SCORE_NUMBER),
            best_time_online: ScoreGenerator.generateScore(this.DEFAULT_SCORE_NUMBER),
            creation_date: new Date(),
        });
        await gameCard.save();

        return JSON.stringify(this.getCommonGameCard(gameCard, imagePair));
    }

    private async makeChanges(req: Request, doc: IGameCard): Promise<void> {
        let changed: boolean = false;
        if (req.body.best_time_solo) {
            changed = true;
            doc.best_time_solo = ScoreGenerator.generateScore(this.DEFAULT_SCORE_NUMBER);
        }
        if (req.body.best_time_online) {
            changed = true;
            doc.best_time_online = ScoreGenerator.generateScore(this.DEFAULT_SCORE_NUMBER);
        }
        if (!changed) {
            throw new InvalidFormatException(R.ERROR_NO_CHANGES);
        }
        await doc.save();
    }

    public async update(req: Request): Promise<string> {
        const id: string = req.params.id;

        return GameCard.findById(id).then(async (doc: IGameCard) => {

            await this.makeChanges(req, doc);

            const message: Message = {
                title: R.SUCCESS,
                body: R.SUCCESS_GAME_CARD_UPDATED,
            };

            return JSON.stringify(message);
        }).catch((err: Error) => {
            if (err.name === "InvalidFormatException") {
                throw err;
            }
            throw new NotFoundException(R.ERROR_UNKOWN_ID);
        });

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
            throw new NotFoundException(R.ERROR_UNKOWN_ID);
        });
    }

    public async delete(id: string): Promise<string> {
        return GameCard.findById(id)
        .then(async (doc: IGameCard) => {
            await doc.remove();
            const message: Message = {
                title: R.SUCCESS,
                body: R.SUCCESS_GAME_CARD_DELETED,
            };

            return JSON.stringify(message); })
        .catch((error: Error) => {
            throw new NotFoundException(R.ERROR_UNKOWN_ID);
        });
    }

    private async getImagePairId(id: string): Promise<ICommonImagePair> {
        return Axios.get<ICommonImagePair>(`http://${Config.hostname}:${Config.port}/image-pair/${id}`)
        .then((response: AxiosResponse<ICommonImagePair>) => {
            return response.data;
        })
        .catch(() => {
            throw new NotFoundException(R.ERROR_UNKOWN_ID_IMAGE);
        });
    }

    private getCommonGameCard(mongooseGameCard: IGameCard, imagePair: ICommonImagePair): ICommonGameCard {
        const response: ICommonGameCard = JSON.parse(JSON.stringify(mongooseGameCard));
        response.image_pair = imagePair;
        delete response["imagePairId"];

        return response;
    }
}

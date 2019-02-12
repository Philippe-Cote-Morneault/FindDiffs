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
    public readonly NUMBER_OF_DIFFERENCES: number = 7;
    public readonly RESOURCE_ID: string = "resource_id";

    private async validatePost(req: Request): Promise<void> {
        if (!req.body.name) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.NAME_]));
        }

        if (!req.body[this.RESOURCE_ID]) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.RESOURCE_ID_]));
        }

        if (!req.body.pov) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.POV_]));
        }

        if (!EnumUtils.isStringInEnum(req.body.pov, POVType)) {
            throw new InvalidFormatException(_e(R.ERROR_WRONG_TYPE, [R.POV_]));
        }
        const povType: POVType = EnumUtils.enumFromString<POVType>(req.body.pov, POVType) as POVType;
        switch (povType) {
            case POVType.Simple:
                const imagePair: ICommonImagePair = await this.getImagePairId(req.body[this.RESOURCE_ID]);
                if (imagePair.differences_count !== this.NUMBER_OF_DIFFERENCES) {
                    throw new InvalidFormatException(_e(R.ERROR_DIFFERENCE_INVALID, [imagePair.differences_count]));
                }
                break;
            case POVType.Free:
                // tslint:disable-next-line:no-suspicious-comment
                // TODO Change this for an other resource
                await this.getImagePairId(req.body[this.RESOURCE_ID]);
                break;
            default:
        }
    }

    public async post(req: Request): Promise<string> {
        await this.validatePost(req);

        const gameCard: IGameCard = new GameCard({
            pov: req.body.pov,
            title: req.body.name,
            resource_id: req.body.resource_id,
            best_time_solo: ScoreGenerator.generateScore(this.DEFAULT_SCORE_NUMBER),
            best_time_online: ScoreGenerator.generateScore(this.DEFAULT_SCORE_NUMBER),
            creation_date: new Date(),
        });
        await gameCard.save();

        return JSON.stringify(this.getCommonGameCard(gameCard));
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
            if (!doc) {
                throw new NotFoundException(R.ERROR_UNKOWN_ID);
            }

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
        return GameCard.find({}).then(async (docs: IGameCard[]) => {
            const gameCards: ICommonGameCard[] = new Array<ICommonGameCard>();

            const promises: Promise<void>[] = docs.map(async(doc: IGameCard) => {
                gameCards.push(this.getCommonGameCard(doc));
            });
            await Promise.all(promises);

            return JSON.stringify(gameCards);

        });
    }

    public async single(id: string): Promise<string> {
        return GameCard.findById(id).then(async(doc: IGameCard) => {
            if (!doc) {
                throw new NotFoundException(R.ERROR_UNKOWN_ID);
            }

            return JSON.stringify(this.getCommonGameCard(doc));
        })
        .catch((err: Error) => {
            throw new NotFoundException(R.ERROR_UNKOWN_ID);
        });
    }

    public async delete(id: string): Promise<string> {
        return GameCard.findById(id)
        .then(async (doc: IGameCard) => {
            if (!doc) {
                throw new NotFoundException(R.ERROR_UNKOWN_ID);
            }
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

    private getCommonGameCard(mongooseGameCard: IGameCard): ICommonGameCard {
        return (mongooseGameCard as ICommonGameCard);
    }

    private async getImagePairId(id: string): Promise<ICommonImagePair> {
        return Axios.get<ICommonImagePair>(`http://${Config.hostname}:${Config.port}/image-pair/${id}`)
        .then((response: AxiosResponse<ICommonImagePair>) => {
            return response.data;
        })
        .catch(() => {
            throw new NotFoundException(R.ERROR_UNKOWN_ID);
        });
    }

}

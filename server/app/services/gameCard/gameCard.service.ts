import { Request } from "express";
import "reflect-metadata";
import { Message } from "../../../../common/communication/message";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { ICommonGameCard, ICommonScoreEntry, POVType } from "../../../../common/model/gameCard";
import { GameCard, IGameCard } from "../../model/schemas/gameCard";
import { _e, R } from "../../strings";
import { EnumUtils } from "../../utils/enumUtils";
import { Validation } from "../../utils/validation";
import { IGameCardService } from "../interfaces";
import { Service } from "../service";
import { UsernameValidator } from "../user/usernameValidator";
import { ScoreGenerator } from "./scoreGenerator";
import { ScoreUpdater } from "./scoreUpdater";

export class GameCardService extends Service implements IGameCardService {

    public static readonly DEFAULT_SCORE_NUMBER: number = 3;
    public static readonly NUMBER_OF_DIFFERENCES: number = 7;

    public static async updateScore(req: Request | undefined, doc: IGameCard | undefined, userScore: ICommonScoreEntry): Promise<void> {
        let changed: boolean = false;
        if (req && doc) {
            if (req.body.best_time_solo) {
                changed = true;
                doc.best_time_solo = ScoreUpdater.updateScore(doc.best_time_solo, userScore);
            }
            if (req.body.best_time_online) {
                changed = true;
                doc.best_time_online = ScoreUpdater.updateScore(doc.best_time_online, userScore);
            }
            if (!changed) {
                throw new InvalidFormatException(R.ERROR_NO_CHANGES);
            }
            await doc.save();
        }
    }

    private async validatePost(req: Request): Promise<void> {
        if (!req.body.name) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.NAME_]));
        }
        if (!UsernameValidator.validateUsername(req.body.name)) {
            throw new InvalidFormatException(R.ERROR_INVALID_GAMENAME);
        }
        if (!req.body.resource_id) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.RESOURCE_ID_]));
        }
        if (!req.body.pov) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.POV_]));
        }
        if (!EnumUtils.isStringInEnum(req.body.pov, POVType)) {
            throw new InvalidFormatException(_e(R.ERROR_WRONG_TYPE, [R.POV_]));
        }
        await Validation.validateResourceId(
            req.body.resource_id,
            EnumUtils.enumFromString<POVType>(req.body.pov, POVType) as POVType,
        );
    }

    public async post(req: Request): Promise<string> {
        await this.validatePost(req);

        const gameCard: IGameCard = new GameCard({
            pov: req.body.pov,
            title: req.body.name,
            resource_id: req.body.resource_id,
            best_time_solo: ScoreGenerator.generateScore(GameCardService.DEFAULT_SCORE_NUMBER),
            best_time_online: ScoreGenerator.generateScore(GameCardService.DEFAULT_SCORE_NUMBER),
            creation_date: new Date(),
        });
        await gameCard.save();

        return JSON.stringify(this.getCommonGameCard(gameCard));
    }

    private async generateScore(req: Request, doc: IGameCard): Promise<void> {
        let changed: boolean = false;
        if (req.body.best_time_solo) {
            changed = true;
            doc.best_time_solo = ScoreGenerator.generateScore(GameCardService.DEFAULT_SCORE_NUMBER);
        }
        if (req.body.best_time_online) {
            changed = true;
            doc.best_time_online = ScoreGenerator.generateScore(GameCardService.DEFAULT_SCORE_NUMBER);
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
                throw new NotFoundException(R.ERROR_UNKNOWN_ID);
            }

            await this.generateScore(req, doc);

            const message: Message = {
                title: R.SUCCESS,
                body: R.SUCCESS_GAME_CARD_UPDATED,
            };

            return JSON.stringify(message);
        }).catch((err: Error) => {
            if (err.name === "InvalidFormatException") {
                throw err;
            }
            throw new NotFoundException(R.ERROR_UNKNOWN_ID);
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
                throw new NotFoundException(R.ERROR_UNKNOWN_ID);
            }

            return JSON.stringify(this.getCommonGameCard(doc));
        })
        .catch((err: Error) => {
            throw new NotFoundException(R.ERROR_UNKNOWN_ID);
        });
    }

    public async delete(id: string): Promise<string> {
        return GameCard.findById(id)
        .then(async (doc: IGameCard) => {
            if (!doc) {
                throw new NotFoundException(R.ERROR_UNKNOWN_ID);
            }
            await doc.remove();
            const message: Message = {
                title: R.SUCCESS,
                body: R.SUCCESS_GAME_CARD_DELETED,
            };

            return JSON.stringify(message); })
        .catch((error: Error) => {
            throw new NotFoundException(R.ERROR_UNKNOWN_ID);
        });
    }

    private getCommonGameCard(mongooseGameCard: IGameCard): ICommonGameCard {
        return (mongooseGameCard as ICommonGameCard);
    }

}

import { Request } from "express";
import { Message } from "../../../../common/communication/message";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { GameCard, IGameCard } from "../../model/schemas/gameCard";
import { R, _e } from "../../strings";
import { IScoreService } from "../interfaces";
import { Service } from "../service";
import { ScoreGenerator } from "./scoreGenerator";

export class ScoreService extends Service implements IScoreService {
    public static readonly DEFAULT_SCORE_NUMBER: number = 3;

    private async generateScore(req: Request, doc: IGameCard): Promise<void> {
        let changed: boolean = false;
        if (req.body.best_time_solo) {
            changed = true;
            doc.best_time_solo = ScoreGenerator.generateScore(ScoreService.DEFAULT_SCORE_NUMBER);
        }
        if (req.body.best_time_online) {
            changed = true;
            doc.best_time_online = ScoreGenerator.generateScore(ScoreService.DEFAULT_SCORE_NUMBER);
        }
        if (!changed) {
            throw new InvalidFormatException(R.ERROR_NO_CHANGES);
        }
        await doc.save();
    }

    public post(req: Request): Promise<string> {
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

    private validateUpdate(req: Request, doc: IGameCard): void {
        if (!req.body.username) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.USERNAME_]));
        }
        if (!req.body.time) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.TIME_]));
        }
        if (isNaN(Number(req.body.time))) {
            throw new InvalidFormatException(_e(R.ERROR_N_A_N, [R.TIME_]));
        }
        if (Number(req.body.time) > 0) {
            throw new InvalidFormatException(_e(R.ERROR_MORE_ZERO, [R.TIME_]));
        }
        if (!req.body.type) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.GAME_TYPE_]));
        }
        if (!EnumUtils.isStringInEnum(req.body.type, GameType)) {
            throw new InvalidFormatException(_e(R.ERROR_WRONG_TYPE, [R.GAME_TYPE_]));
    }
    }

    public async update(req: Request): Promise<string> {
        return GameCard.findById(req.params.id).then(async (doc: IGameCard) => {
            if (!doc) {
                throw new NotFoundException(R.ERROR_UNKNOWN_ID);
            }
            this.validateUpdate(req, doc);

            const newScore: number = Number(req.body.time);
            const gameType: GameType = EnumUtils.enumFromString(req.body.type, GameType) as GameType;
            const numberOfScores: number = doc.best_time_online.length;
            if (gameType === GameType.Online) {
                const lastScore: ICommonScoreEntry = doc.best_time_online[numberOfScores - 1];
                if (lastScore.score > newScore) {
                    let position: number = numberOfScores - 1;
                    for (let i: number = numberOfScores - 1; i >= -1; i--) {
                        if (doc.best_time_online[i].score < newScore) {
                            doc.best_time_online[i + 1].score = newScore;
                            doc.best_time_online[i + 1].name = req.body.username;
                            // tslint:disable-next-line:no-magic-numbers
                            position = i + 2;
                            break;
                        }
                    }
                    const response: INewScore = {
                        is_top_score: true,
                        details: {
                            place: position,
                            username: req.body.username,
                            game_name: doc.title,
                            game_type: gameType,
                        },
                    };

                    return JSON.stringify(response);
                } else {
                    const response: INewScore = {
                        is_top_score: false,
                    };

                    return JSON.stringify(response);
                }
            }

            return "";
        });
    }

    public single(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}

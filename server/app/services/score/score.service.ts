import { Request } from "express";
import { Message } from "../../../../common/communication/message";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { GameType, ICommonScoreEntry } from "../../../../common/model/gameCard";
import { INewScore } from "../../../../common/model/score";
import { GameCard, IGameCard } from "../../model/schemas/gameCard";
import { _e, R } from "../../strings";
import { EnumUtils } from "../../utils/enumUtils";
import { IScoreService } from "../interfaces";
import { Service } from "../service";
import { ScoreGenerator } from "./scoreGenerator";

export class ScoreService extends Service implements IScoreService {
    public static readonly DEFAULT_SCORE_NUMBER: number = 3;
    public static readonly POSITION_MODIFIER: number = 2;
    private static readonly MS_IN_1_SECOND: number = 1000;

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
        if (Number(req.body.time) < 0) {
            throw new InvalidFormatException(_e(R.ERROR_LESS_ZERO, [R.TIME_]));
        }
        /*
        if (!req.body.type) {
            console.log("notyp");
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.GAME_TYPE_]));
        }
        */
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

            return JSON.stringify(this.verifyScore(req, doc));
        });
    }

    public verifyScore(req: Request, doc: IGameCard): INewScore {
        const newScore: number = Number(req.body.time) / ScoreService.MS_IN_1_SECOND;
        const numberOfScores: number = doc.best_time_online.length;
        const scoreEntry: ICommonScoreEntry[] = req.body.type === GameType.Online ? doc.best_time_online : doc.best_time_solo;
        const lastScore: ICommonScoreEntry = scoreEntry[numberOfScores - 1];
        let response: INewScore = { is_top_score: false };

        if (lastScore.score > newScore) {
            let position: number = numberOfScores;
            for (let i: number = 0; i < numberOfScores; i++) {
                if (scoreEntry[i].score > newScore) {
                    position = i + 1;
                    break;
                }
            }
            response = {
                is_top_score: true,
                details: {
                    place: position,
                    username: req.body.username,
                    game_name: doc.title,
                    game_type: req.body.type,
                },
            };
        }

        return response;
    }

    public single(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}

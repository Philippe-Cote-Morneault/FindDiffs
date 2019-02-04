import { Request } from "express";
import "reflect-metadata";
import { Message } from "../../../../common/communication/message";
import { ExistsAlreadyException } from "../../../../common/errors/existsAlreadyException";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { IUser, User } from "../../model/schemas/user";
import { _e, R } from "../../strings";
import { IUserService } from "../interfaces";
import { Service } from "../service";

export class UserService extends Service implements IUserService {

    public async index(): Promise<string> {
        return User.find({}).then((docs: IUser[]) => {
            return  JSON.stringify(docs);
        }).catch((error: Error) => {
            throw new InvalidFormatException(error.message);
        });
    }

    public async single(id: string): Promise<string> {
        return User.findById(id)
            .then((doc: IUser) => {
                if (!doc) {
                    throw new NotFoundException(R.ERROR_UNKOWN_ID);
                }

                return JSON.stringify(doc); })
            .catch((error: Error) => {
                throw new NotFoundException(R.ERROR_UNKOWN_ID);
            });
    }

    public async delete(id: string): Promise<string> {
        return User.findById(id)
        .then(async (doc: IUser) => {
            if (!doc) {
                throw new NotFoundException(R.ERROR_UNKOWN_ID);
            }
            await doc.remove();
            const message: Message = {
                title: R.SUCCESS,
                body: R.SUCCESS_USER_DELETED,
            };

            return JSON.stringify(message); })
        .catch((error: Error) => {
            throw new NotFoundException(R.ERROR_UNKOWN_ID);
        });
    }

    public async post(req: Request): Promise<string> {
        await this.validatePost(req);

        const user: IUser = new User({
            username: req.body.username,
            creation_date: new Date(),
        });
        await user.save();

        return JSON.stringify(user);
    }

    private async validatePost(req: Request): Promise<void> {
        if (!req.body.username) {
            throw new InvalidFormatException(_e(R.ERROR_MISSING_FIELD, [R.USERNAME_]));
        }

        if (!this.isUsernameValid(req.body.username)) {
            throw new InvalidFormatException(_e(R.ERROR_INVALID, [R.USERNAME_]));
        }

        if (!await this.isAvailable(req.body.username)) {
            throw new ExistsAlreadyException(R.ERROR_USERNAME_TAKEN);
        }
    }

    private async isAvailable(username: string): Promise<boolean> {
        return User.countDocuments({username: username}).then((c: number) => {
            return c === 0;
        });
    }

    private isUsernameValid(username: string): boolean {
        const regex: RegExp = new RegExp("^[a-zA-Z0-9]{3,12}$");

        return regex.test(username);
    }

}

import { Request } from "express";
import "reflect-metadata";
import { Message } from "../../../../common/communication/message";
import { ExistsAlreadyException } from "../../../../common/errors/existsAlreadyException";
import { InvalidFormatException } from "../../../../common/errors/invalidFormatException";
import { NotFoundException } from "../../../../common/errors/notFoundException";
import { IUser, User } from "../../model/schemas/user";
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
                return JSON.stringify(doc); })
            .catch((error: Error) => {
                throw new NotFoundException("The id could not be found");
            });
    }

    public async delete(id: string): Promise<string> {
        return User.findById(id)
        .then(async (doc: IUser) => {
            await doc.remove();
            const message: Message = {
                title: "Success",
                body: "The user was deleted.",
            };

            return JSON.stringify(message); })
        .catch((error: Error) => {
            throw new NotFoundException("The id could not be found");
        });
    }

    public async post(req: Request): Promise<string> {
        if (req.body.username) {
            if (this.isUsernameValid(req.body.username)) {
                if (await this.isAvailable(req.body.username)) {
                    const user: IUser = new User({
                        username: req.body.username,
                        creation_date: new Date(),
                    });
                    await user.save();

                    return JSON.stringify(user);
                }

                throw new ExistsAlreadyException("The username is already taken.");

            }

            throw new InvalidFormatException("The field username is not valid.");
        }

        throw new InvalidFormatException("The field username is not set.");
    }

    private async isAvailable(username: string): Promise<boolean> {
        return User.countDocuments({username: username}).then((c: number) => {
            return c === 0;
        }).catch((err: Error) => {
            return false;
        });
    }

    private isUsernameValid(username: string): boolean {
        const regex: RegExp = new RegExp("^[a-zA-Z0-9]{2,13}$");

        return regex.test(username);
    }

}

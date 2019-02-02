import { Request, Response } from "express";
import "reflect-metadata";
import { IUser, User } from "../../model/schemas/user";
import { IUserService } from "../interfaces";
import { Service } from "../service";
import { Message } from "../../../../common/communication/message";

export class UserService extends Service implements IUserService {

    public index(): Promise<string> {
        return User.find({}).then((docs: IUser[]) => {
            return  JSON.stringify(docs);
        }).catch((error: Error) => {
            return this.printError(error.message);
        });
    }

    public single(id: string): Promise<string> {
        return User.findById(id)
            .then((doc: IUser) => {
                return JSON.stringify(doc); })
            .catch((error: Error) => {
                // TODO Catch exception and rethrow a diffrent error code
                return JSON.stringify(this.printError(error.message));
            });
    }

    public delete(id: string): Promise<string> {
        return User.findById(id)
        .then((doc: IUser) => {
            doc.remove();
            const message: Message = {
                title: "Success",
                body: "The user was deleted.",
            };

            return JSON.stringify(message); })
        .catch((error: Error) => {
            // TODO Catch exception and rethrow a diffrent error code
            return JSON.stringify(this.printError(error.message));
        });
    }

    public async post(req: Request): Promise<string> {
        if (req.body.username) {
            if (this.validateUsername(req.body.username)) {
                if (await this.isAvailable(req.body.username)) {
                    const user: IUser = new User({
                        username: req.body.username,
                        creation_date: new Date(),
                    });
                    user.save();

                    return JSON.stringify(user);
                }

                return this.printError("The username is already taken.");

            }

            return this.printError("The field username is not valid.");
        }

        return this.printError("The field username is not set.");
    }

    private isAvailable(username: string): Promise<boolean> {
        return User.count({username: username}).then((c: number) => {
            return c > 0;
        }).catch(() => {
            return false;
        });
    }

    private validateUsername(username: string): boolean {
        const regex: RegExp = new RegExp("^[a-zA-Z0-9]{2,13}$");

        return regex.test(username);
    }

}

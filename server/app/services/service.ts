import { injectable } from "inversify";
import { Message } from "../../../common/communication/message";

@injectable()
export class Service {
    public printError(error: string): string {
        const message: Message = {
            title: "Error",
            body: error,
        };

        return JSON.stringify(message);
    }
}

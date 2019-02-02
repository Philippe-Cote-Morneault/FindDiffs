import { Message } from "../../../common/communication/message";

export class Service {

    public printError(error: string): string {
        const message: Message = {
            title: "Error",
            body: error,
        };

        return JSON.stringify(message);
    }
}

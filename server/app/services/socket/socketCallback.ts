import { ICommonSocketMessage } from "../../../../common/communication/webSocket/socketMessage";

export type SocketCallback = (message: ICommonSocketMessage, sender: string) => void;

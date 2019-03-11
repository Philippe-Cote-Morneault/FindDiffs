export interface ICommonSocketMessage {
    data: string,
    timestamp: Date,
}

export enum Event {UserConnected = "UserConnected", UserDisconnected = "UserDisconnected"};
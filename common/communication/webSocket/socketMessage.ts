export interface ICommonSocketMessage {
    data: Object,
    timestamp: Date,
}

export enum Event {UserConnected = "UserConnected", UserDisconnected = "UserDisconnected"};
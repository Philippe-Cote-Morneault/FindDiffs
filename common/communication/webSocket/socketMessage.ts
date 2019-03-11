export interface ICommonSocketMessage {
    data: Object,
    timestamp: Date,
}

export interface ICommonTest {
    hi: string,
    usename: Object,
    time: Date,
}

export enum Event {UserConnected = "UserConnected", UserDisconnected = "UserDisconnected"};
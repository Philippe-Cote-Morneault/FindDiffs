export interface ICommonSocketMessage {
    data: Object,
    timestamp: Date,
}

export enum Event {Authenticate = "Authenticate", UserConnected = "UserConnected", NewUser = "NewUser", UserDisconnected = "UserDisconnected", GameStarted = "GameStarted",
                   PlaySoloGame = "PlaySoloGame", ReadyToPlay = "ReadyToPlay", GameClick = "GameClick",
                   DifferenceFound = "DifferenceFound", InvalidClick = "InvalidClick", GameEnded = "GameEnded"};

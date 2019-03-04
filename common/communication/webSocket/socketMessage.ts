export interface SocketMessage {
    eventType: Event,
    data: Object,
    timestamp: Date,
    sender: string,
}

export enum Event {GameMessage}
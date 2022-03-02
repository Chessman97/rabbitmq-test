export interface RabbitBrokerInterface {
    listen(): Promise<void>;
    send(message: string): Promise<void>;
}
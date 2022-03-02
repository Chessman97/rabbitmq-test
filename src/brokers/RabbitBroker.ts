import * as amqp from 'amqplib/callback_api';

import { MongoConnection } from '../db/MongoConnection';
import { env } from '../env';

export class RabbitBroker {

    private queue: string;

    public constructor() {
        this.queue = 'task_queue';
    }

    public async listen(): Promise<void> {

        amqp.connect(env.app.queue.rabbitConnection, async (error, connection: amqp.Connection) => {
            connection.createChannel(async (error, channel: amqp.Channel) => {
                channel.assertQueue(this.queue, {
                    durable: true
                });
                channel.prefetch(1);
                console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', this.queue);
                channel.consume(this.queue, async function (msg: amqp.Message) {
                    const message = msg.content.toString();
                    console.log(` [*] Successful message: ${message}. To exit press CTRL+C`);
                    const Message = MongoConnection.Instance.Message;
                    const newMessage = new Message({ message });
                    newMessage.save();
                    setTimeout(function () {
                        channel.ack(msg);
                    });
                });
            });
        });
    }

    public async send(message: string): Promise<void> {
        amqp.connect(env.app.queue.rabbitConnection, async (error, connection: amqp.Connection) => {
            connection.createChannel(async (error, channel: amqp.Channel) => {
                channel.assertQueue(this.queue, {
                    durable: true
                });
                channel.prefetch(1);
                console.log(` [*] Sending message: ${message}. To exit press CTRL+C`);
                channel.sendToQueue(this.queue, Buffer.from(message));
            });
        });
    }

}
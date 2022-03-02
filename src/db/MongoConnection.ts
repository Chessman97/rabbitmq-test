import * as mongoose from 'mongoose';

import { env } from '../env';

export class MongoConnection {

    private static _instance: MongoConnection;
    public mongoose: any;
    public Message: any;

    private constructor() {
        this.createConnection();
    }

    private async createConnection(): Promise<void> {
        this.mongoose = await mongoose.connect(env.app.db.connect);
        await this.initMessageModel();
    }

    private async initMessageModel(): Promise<void> {
        const messageSchema = new mongoose.Schema({
            message: String
        });
        this.Message = this.mongoose.model('Message', messageSchema);
    }


    public static get Instance(): MongoConnection {
        return this._instance || (this._instance = new this());
    }
}
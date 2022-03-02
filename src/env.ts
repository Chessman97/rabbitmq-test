import * as dotenv from 'dotenv';
import * as path from 'path';

import { getOsEnv } from './lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    app: {
        queue: {
            rabbitConnection: getOsEnv('RABBIT_CONNECTION')
        },
        db: {
            connect: getOsEnv('MONGO_CONNECTION')
        }
    },
};

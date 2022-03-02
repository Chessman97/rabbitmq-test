import { RabbitBroker } from './brokers/RabbitBroker';
import { RabbitBrokerInterface } from './brokers/RabbitBrokerInterface';
import { MongoConnection } from './db/MongoConnection';

MongoConnection.Instance;
const broker: RabbitBrokerInterface = new RabbitBroker();

broker.listen();
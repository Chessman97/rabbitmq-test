import { RabbitBroker } from './brokers/RabbitBroker';
import { RabbitBrokerInterface } from './brokers/RabbitBrokerInterface';

const broker: RabbitBrokerInterface = new RabbitBroker();

broker.send(process.argv.slice(2)[0]);
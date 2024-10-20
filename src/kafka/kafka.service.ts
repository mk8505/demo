import { Injectable, Inject, Logger } from '@nestjs/common';
import { Kafka, Partitioners } from 'kafkajs';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);
  private kafka = new Kafka({
    clientId: 'user-service',
    brokers: [process.env.KAFKA_BROKER],
  });

  private producer = this.kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  async sendMessage(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      this.logger.error(`Failed to send message: ${error.message}`);
      throw new Error('Error send message');
    }
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (error) {
      this.logger.error(`Failed Error connect!: ${error.message}`);
      throw new Error('Error connect!');

    }
  }

  async disconnect() {
    try {
      await this.producer.disconnect();
    } catch (error) {
      this.logger.error(`Failed Error disconnect!: ${error.message}`);
      throw new Error('Error disconnect!');
    }
  }
}

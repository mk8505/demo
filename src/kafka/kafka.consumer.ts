import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka = new Kafka({ clientId: 'user-service', brokers: [process.env.KAFKA_BROKER] });
  private consumer: Consumer;

  async onModuleInit() {
    this.consumer = this.kafka.consumer({ groupId: 'user-group' });
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'user-created' });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message: ${message.value.toString()}`);
        // Handle the message here
      },
    });
  }
}
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka = new Kafka({ clientId: 'user-service', brokers: [process.env.KAFKA_BROKER] });
  private consumer: Consumer;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async onModuleInit() {
    this.consumer = this.kafka.consumer({ groupId: 'user-group' });
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'user-created' });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const userData = JSON.parse(message.value.toString());
        const user = this.userRepository.create(userData);
        await this.userRepository.save(user);
      },
    });
  }
}
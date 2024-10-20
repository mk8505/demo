import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaConsumerService } from './kafka.consumer';

@Module({
  providers: [KafkaService,KafkaConsumerService],
  exports: [KafkaService],
})
export class KafkaModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly kafkaService: KafkaService) { }
 
  async onModuleInit() {
    await this.kafkaService.connect();
  }

  async onModuleDestroy() {
    await this.kafkaService.disconnect();
  }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { KafkaModule } from '../kafka/kafka.module';
import { KafkaConsumerService } from '../kafka/kafka.consumer';

@Module({
  imports: [TypeOrmModule.forFeature([User]),KafkaModule],
  controllers: [UsersController],
  providers: [UsersService,KafkaConsumerService],
})
export class UsersModule {}

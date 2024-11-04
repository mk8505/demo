import { Injectable, NotFoundException,Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { KafkaService } from '../kafka/kafka.service'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private kafkaService: KafkaService,
  ) { }

  async create(user: Partial<User>): Promise<User> {
    try {
      await this.kafkaService.sendMessage('user-created', user);
      return user as User;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new Error('Error creating user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.usersRepository.find();
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new Error('Error  findAll user');
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return this.usersRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new Error('Error find user');
    }
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    try {
      await this.usersRepository.update(id, user);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new Error('Error update user');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new Error('Error remove user');
    }
  }
}

import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() user: Partial<User>) {
    const userInstance = plainToInstance(User, user);
    const errors = await validate(userInstance);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    try {
      let userCreate = await this.usersService.create(user);
      if (userCreate) {
        return {
          statusCode: 200,
          message: `Created User successfully!`,
          data: userCreate
        }
      } else {
        this.logger.error(`Failed to User not created ${userCreate}`);
        throw new NotFoundException('User not created');
      }
    } catch (error) {
      this.logger.error(`Failed to create user ${error.message}`);
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      let usersFindAll = await this.usersService.findAll();
      if(usersFindAll){
        return {
          statusCode: 200,
          message: `All User successfully found !`,
          data: usersFindAll
        };
      }else{
        this.logger.error(`User not found ${usersFindAll}`);
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      this.logger.error(`Failed to findAll user ${error.message}`);
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      let usersFindOne = await this.usersService.findOne(+id);
      if(usersFindOne){
        return {
          statusCode: 200,
          message: `User with ID ${id} successfully found !`,
          data: usersFindOne
        };
      }else{
        this.logger.error(`User not found ${usersFindOne}`);
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      this.logger.error(`Failed to find user ${id}: ${error.message}`);
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: Partial<User>) {
    const userInstance = plainToInstance(User, user);
    const errors = await validate(userInstance);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    try {
      userInstance.updatedAt = new Date();
      const updatedUser = await this.usersService.update(+id, userInstance);
      if(updatedUser){
        return {
          statusCode: 200,
          message: `User with ID ${id} successfully updated`,
          data: updatedUser
        };
      }else{
        this.logger.error(`User not updated ${updatedUser}`);
        throw new NotFoundException('User not updated');
      }
    } catch (error) {
      this.logger.error(`Failed to update user with ID ${id}: ${error.message}`);
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(+id);
      return {
        statusCode: 200,
        message: `User with ID ${id} successfully deleted !`,
      };
    } catch (error) {
      this.logger.error(`Failed to remove user with ID ${id}: ${error.message}`);
      throw new NotFoundException(error.message);
    }
  }
}

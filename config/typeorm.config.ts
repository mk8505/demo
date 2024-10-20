import { DataSource } from 'typeorm';
import { User } from '../src/users/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();
export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
  migrations: ['./src/migrations/*.ts'],
});

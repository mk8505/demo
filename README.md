## Project setup
## Install NestJS CLI
$ npm install -g @nestjs/cli

## Create a New Project
$ nest new assignment

## Navigate to the Project Directory
$ cd assignment

## Generate the Users Module

$ nest generate module users
$ nest generate service users
$ nest generate controller users
$ src/user/user.entity.ts

## Run the Application
npm run start

## Implement a Create, Read, Update, and Delete (CRUD) operation for a simple entity, such as "Users
POST /users
GET /users
GET /users/:id
PUT /users/:id
DELETE /users/:id

## PostgreSQL for storing data and database design (like migration scripts, tables)

## Generate Migration
$ npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:generate ./src/migrations/CreateUsersTable.ts -d ./config/typeorm.config.ts

## Run migration
$ npx ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:run -d ./config/typeorm.config.ts

## install Kafka and run 
## Kafka Run zookeeper-server open  CMD run commnad 
$ .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
##  Kafka Run server open  CMD run commnad
$ .\bin\windows\kafka-server-start.bat .\config\server.properties

## Create a Kafka Topic
$ open new cmd prompt Run the command to create a topic
$.\bin\windows\kafka-topics.bat --create --topic user-actions --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1

## Verify the Topic Creation
.\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092

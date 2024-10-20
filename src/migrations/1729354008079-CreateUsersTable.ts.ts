import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1729354008079 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                "email" character varying NOT NULL, 
                "phone" character  NULL,
                "age" integer  NULL,
                "isActive" boolean NOT NULL,
                "createdAt"  date NOT NULL,
                "updatedAt" date NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
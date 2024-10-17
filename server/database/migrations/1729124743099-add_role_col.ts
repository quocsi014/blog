import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleCol1729124743099 implements MigrationInterface {
    name = 'AddRoleCol1729124743099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

}

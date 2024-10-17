import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultRole1729124852904 implements MigrationInterface {
    name = 'AddDefaultRole1729124852904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NOT NULL DEFAULT 'READER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NOT NULL`);
    }

}

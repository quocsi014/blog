import { MigrationInterface, QueryRunner } from "typeorm";

export class FixStatusColBlogTable1735316944075 implements MigrationInterface {
    name = 'FixStatusColBlogTable1735316944075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`status\` enum ('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'DRAFT'`);
    }

}

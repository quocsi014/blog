import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColBlog1735316560740 implements MigrationInterface {
    name = 'AddColBlog1735316560740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`content\` \`status\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'DRAFT'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`status\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`status\` \`content\` text NULL`);
    }

}

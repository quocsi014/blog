import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnOfPosts1729875912119 implements MigrationInterface {
    name = 'FixColumnOfPosts1729875912119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`content\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`content\` varchar(255) NOT NULL`);
    }

}

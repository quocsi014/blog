import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarCol1729093143957 implements MigrationInterface {
    name = 'AddAvatarCol1729093143957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refresh_token\` \`avatar_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar_url\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar_url\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar_url\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar_url\` \`refresh_token\` varchar(255) NULL`);
    }

}

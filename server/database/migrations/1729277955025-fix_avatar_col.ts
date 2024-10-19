import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAvatarCol1729277955025 implements MigrationInterface {
    name = 'FixAvatarCol1729277955025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar_url\` \`avatar_url\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar_url\` \`avatar_url\` varchar(255) NOT NULL`);
    }

}

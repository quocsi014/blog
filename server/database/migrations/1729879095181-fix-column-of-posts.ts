import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnOfPosts1729879095181 implements MigrationInterface {
    name = 'FixColumnOfPosts1729879095181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`thumbnail_url\` \`thumbnail_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`content\` \`content\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`content\` \`content\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`thumbnail_url\` \`thumbnail_url\` varchar(255) NOT NULL`);
    }

}

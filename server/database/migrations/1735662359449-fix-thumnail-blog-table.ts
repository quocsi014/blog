import { MigrationInterface, QueryRunner } from "typeorm";

export class FixThumnailBlogTable1735662359449 implements MigrationInterface {
    name = 'FixThumnailBlogTable1735662359449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`thumbnail_url\` \`thumbnail_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`thumbnail_id\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`thumbnail_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD UNIQUE INDEX \`IDX_7afa448dd4430b2c5a4ff606f6\` (\`thumbnail_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_7afa448dd4430b2c5a4ff606f6\` ON \`posts\` (\`thumbnail_id\`)`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_7afa448dd4430b2c5a4ff606f61\` FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`images\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_7afa448dd4430b2c5a4ff606f61\``);
        await queryRunner.query(`DROP INDEX \`REL_7afa448dd4430b2c5a4ff606f6\` ON \`posts\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP INDEX \`IDX_7afa448dd4430b2c5a4ff606f6\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`thumbnail_id\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`thumbnail_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`thumbnail_id\` \`thumbnail_url\` varchar(255) NULL`);
    }

}

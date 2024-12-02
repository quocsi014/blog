import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImage1733153770890 implements MigrationInterface {
    name = 'AddImage1733153770890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_4413d216289808afda0de2bdfd4\``);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar_url\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`commentsId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`commentsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar_url\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_4413d216289808afda0de2bdfd4\` FOREIGN KEY (\`commentsId\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

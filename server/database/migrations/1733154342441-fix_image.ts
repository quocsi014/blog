import { MigrationInterface, QueryRunner } from "typeorm";

export class FixImage1733154342441 implements MigrationInterface {
    name = 'FixImage1733154342441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1aae736b7c5d6925efa8563527\``);
        await queryRunner.query(`DROP INDEX \`IDX_b1aae736b7c5d6925efa856352\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`images\` (\`image_id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`image_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1aae736b7c5d6925efa8563527\` FOREIGN KEY (\`image_id\`) REFERENCES \`images\`(\`image_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1aae736b7c5d6925efa8563527\``);
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b1aae736b7c5d6925efa856352\` ON \`users\` (\`image_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1aae736b7c5d6925efa8563527\` FOREIGN KEY (\`image_id\`) REFERENCES \`image\`(\`image_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

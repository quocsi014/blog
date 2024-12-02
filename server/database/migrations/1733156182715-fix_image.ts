import { MigrationInterface, QueryRunner } from "typeorm";

export class FixImage1733156182715 implements MigrationInterface {
    name = 'FixImage1733156182715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1aae736b7c5d6925efa8563527\``);
        await queryRunner.query(`DROP INDEX \`REL_b1aae736b7c5d6925efa856352\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`image_id\` \`avatar_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_c3401836efedec3bec459c8f81\` (\`avatar_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c3401836efedec3bec459c8f81\` ON \`users\` (\`avatar_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c3401836efedec3bec459c8f818\` FOREIGN KEY (\`avatar_id\`) REFERENCES \`images\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c3401836efedec3bec459c8f818\``);
        await queryRunner.query(`DROP INDEX \`REL_c3401836efedec3bec459c8f81\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_c3401836efedec3bec459c8f81\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar_id\` \`image_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b1aae736b7c5d6925efa856352\` ON \`users\` (\`image_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1aae736b7c5d6925efa8563527\` FOREIGN KEY (\`image_id\`) REFERENCES \`images\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

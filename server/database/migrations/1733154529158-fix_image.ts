import { MigrationInterface, QueryRunner } from "typeorm";

export class FixImage1733154529158 implements MigrationInterface {
    name = 'FixImage1733154529158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`image_id\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`id\` \`image_id\` int NOT NULL AUTO_INCREMENT`);
    }

}

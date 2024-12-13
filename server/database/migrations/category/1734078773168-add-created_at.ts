import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAt1734078773168 implements MigrationInterface {
    name = 'AddCreatedAt1734078773168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_c3401836efedec3bec459c8f81\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c3401836efedec3bec459c8f81\` ON \`users\` (\`avatar_id\`)`);
    }

}

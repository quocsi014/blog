import { MigrationInterface, QueryRunner } from "typeorm";

export class FixName1729851287883 implements MigrationInterface {
    name = 'FixName1729851287883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories_posts\` (\`categoriesId\` int NOT NULL, \`postsId\` int NOT NULL, INDEX \`IDX_219deedf014aaf4efb7b958983\` (\`categoriesId\`), INDEX \`IDX_41a6e37a652b1fa814ea0cf56f\` (\`postsId\`), PRIMARY KEY (\`categoriesId\`, \`postsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories_posts\` ADD CONSTRAINT \`FK_219deedf014aaf4efb7b958983c\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`categories_posts\` ADD CONSTRAINT \`FK_41a6e37a652b1fa814ea0cf56f8\` FOREIGN KEY (\`postsId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories_posts\` DROP FOREIGN KEY \`FK_41a6e37a652b1fa814ea0cf56f8\``);
        await queryRunner.query(`ALTER TABLE \`categories_posts\` DROP FOREIGN KEY \`FK_219deedf014aaf4efb7b958983c\``);
        await queryRunner.query(`DROP INDEX \`IDX_41a6e37a652b1fa814ea0cf56f\` ON \`categories_posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_219deedf014aaf4efb7b958983\` ON \`categories_posts\``);
        await queryRunner.query(`DROP TABLE \`categories_posts\``);
    }

}

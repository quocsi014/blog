import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratePostCategory1729850924233 implements MigrationInterface {
    name = 'GeneratePostCategory1729850924233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`thumbnail_url\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`authorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories_posts_posts\` (\`categoriesId\` int NOT NULL, \`postsId\` int NOT NULL, INDEX \`IDX_e24774f82f518838b1acbe7add\` (\`categoriesId\`), INDEX \`IDX_8a6e72a6e55b4cabe31d04975b\` (\`postsId\`), PRIMARY KEY (\`categoriesId\`, \`postsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_c5a322ad12a7bf95460c958e80e\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories_posts_posts\` ADD CONSTRAINT \`FK_e24774f82f518838b1acbe7addb\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`categories_posts_posts\` ADD CONSTRAINT \`FK_8a6e72a6e55b4cabe31d04975b4\` FOREIGN KEY (\`postsId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories_posts_posts\` DROP FOREIGN KEY \`FK_8a6e72a6e55b4cabe31d04975b4\``);
        await queryRunner.query(`ALTER TABLE \`categories_posts_posts\` DROP FOREIGN KEY \`FK_e24774f82f518838b1acbe7addb\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_c5a322ad12a7bf95460c958e80e\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a6e72a6e55b4cabe31d04975b\` ON \`categories_posts_posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_e24774f82f518838b1acbe7add\` ON \`categories_posts_posts\``);
        await queryRunner.query(`DROP TABLE \`categories_posts_posts\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}

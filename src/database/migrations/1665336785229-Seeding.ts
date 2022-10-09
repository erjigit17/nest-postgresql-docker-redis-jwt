import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeding1665336785229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userTableExisted = await queryRunner.hasTable('users');

    if (userTableExisted) {
      await queryRunner.query(`
          INSERT INTO "users"(id, name, email, password)
          VALUES ('96d8fa92-0982-4d86-bfa8-0d7c5912f2b5', 'July August', 'august@example.com', 'July_August');
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userTableExisted = await queryRunner.hasTable('users');

    if (userTableExisted) {
      await queryRunner.query('TRUNCATE TABLE "users" CASCADE;');
    }
  }
}

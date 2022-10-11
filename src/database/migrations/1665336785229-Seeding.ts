import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeding1665336785229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userTableExisted = await queryRunner.hasTable('users');

    if (userTableExisted) {
      // admin password is 'open sesame' please chang it
      await queryRunner.query(`
          INSERT INTO "users"(id, "firstName", "lastName", email, password, role)
          VALUES ('96d8fa92-0982-4d86-bfa8-0d7c5912f2b5', 'admin', 'admin', 'admin@example.com',
                  '$2b$10$PWiUtODkfBRffAJdDYj3pui.t7pQe1KlDBSjIiPZZS.jPn4MdNn/u', 'ADMIN');
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

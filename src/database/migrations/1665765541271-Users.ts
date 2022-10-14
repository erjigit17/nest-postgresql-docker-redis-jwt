import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1665765541271 implements MigrationInterface {
  name = 'Users1665765541271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`);
    await queryRunner.query(`CREATE TABLE "users"
                             (
                                 "id"        uuid                       NOT NULL DEFAULT uuid_generate_v4(),
                                 "firstName" character varying(255),
                                 "lastName"  character varying(255),
                                 "email"     character varying          NOT NULL,
                                 "password"  character varying          NOT NULL,
                                 "role"      "public"."users_role_enum" NOT NULL DEFAULT 'USER',
                                 "avatar"    character varying,
                                 "isActual"  boolean                    NOT NULL DEFAULT true,
                                 "createdAt" TIMESTAMP                  NOT NULL DEFAULT now(),
                                 "updatedAt" TIMESTAMP                  NOT NULL DEFAULT now(),
                                 CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                                 CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}

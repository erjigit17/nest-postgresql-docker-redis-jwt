import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1665765747584 implements MigrationInterface {
  name = 'Products1665765747584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "products"
                             (
                                 "id"           uuid                   NOT NULL DEFAULT uuid_generate_v4(),
                                 "title"        character varying(255) NOT NULL,
                                 "descriptions" character varying,
                                 "images"       character varying(255) array,
                                 "tags"         character varying(255) array,
                                 "price"        money                  NOT NULL,
                                 "isArchive"    boolean                NOT NULL DEFAULT true,
                                 "createdAt"    TIMESTAMP              NOT NULL DEFAULT now(),
                                 "updatedAt"    TIMESTAMP              NOT NULL DEFAULT now(),
                                 "ownerId"      uuid,
                                 CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "products"
        ADD CONSTRAINT "FK_663aa9983fd61dfc310d407d4da" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products"
        DROP CONSTRAINT "FK_663aa9983fd61dfc310d407d4da"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}

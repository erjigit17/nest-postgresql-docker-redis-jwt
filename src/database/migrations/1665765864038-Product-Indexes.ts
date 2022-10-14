import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductIndexes1665765864038 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_product_title" ON "products" USING GIN (to_tsvector('english', "title")) `);
        await queryRunner.query(`CREATE INDEX "IDX_product_descriptions" ON "products" USING GIN (to_tsvector('english', "descriptions")) `);
        await queryRunner.query(`CREATE INDEX "IDX_product_price" ON "products" ("price") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_product_title"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_product_descriptions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_product_price"`);
    }
}

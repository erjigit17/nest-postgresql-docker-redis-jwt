import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import * as fs from 'fs';

faker.locale = 'en_US';

const MOCK_DATA_COUNT = 10_000


const NOW = new Date().getTime();


function getValues() {
  const fAdj = faker.word.adjective
  const fVerb = faker.word.adverb
  const fNoun = faker.word.noun

  const id = uuidv4()
  const title = `${fAdj()} ${fVerb()} ${fNoun()}`.replaceAll('\'', '\'\'')
  const description = faker.hacker.phrase().replaceAll('\'', '\'\'')
  const tags = `{ ${fAdj().replaceAll('\'', '\'\'')} }`
  const price = Math.floor(Math.random() * 100_000) / 100
  const owner_id = '96d8fa92-0982-4d86-bfa8-0d7c5912f2b5'


  return `('${id}', '${title}', '${description}', '${tags}', '{ ./images }', ${price}, '${owner_id}')`
}


const patternStart = `
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductSeeding${NOW} implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<void> {
      const productTableExisted = await queryRunner.hasTable('products');
  
      if (productTableExisted) {
        await queryRunner.query('TRUNCATE TABLE "products" CASCADE;');
      }
    }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const productTableExisted = await queryRunner.hasTable('products');

    if (productTableExisted) {
      await queryRunner.query(\`
          INSERT INTO "products"("id", "title", "descriptions", "tags", "images", "price", "owner_id")
          VALUES 
`

const patternEnd = `
      \`);
    }
  }
}
`

const fileName = `${NOW}-Product-Seeding.ts`
const path = join(__dirname, '../src/database/migrations', fileName);

const writeableStream = fs.createWriteStream(path)

writeableStream.write(patternStart);

for (let i = 0; i < MOCK_DATA_COUNT ; i++) {
  const isLast = i === MOCK_DATA_COUNT - 1
  const value = `${ getValues() }${ isLast ? ';' : ',\n' }`

  writeableStream.write(value);
}

writeableStream.write(patternEnd);
writeableStream.close();

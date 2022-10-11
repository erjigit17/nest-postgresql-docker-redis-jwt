// eslint-disable-next-line import/no-extraneous-dependencies
import 'source-map-support/register';

declare global {
  export type Uuid = string & { _uuidBrand: undefined };
}

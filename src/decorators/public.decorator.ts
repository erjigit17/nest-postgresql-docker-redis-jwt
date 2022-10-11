import { applyDecorators, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Public = () => applyDecorators(SetMetadata(IS_PUBLIC_KEY, true));

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { TokenPayloadDto } from '../modules/auth/dto';

export const UserCnx = createParamDecorator(
  (_, context: ExecutionContext): TokenPayloadDto => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);

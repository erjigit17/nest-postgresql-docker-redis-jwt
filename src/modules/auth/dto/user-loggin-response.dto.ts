import { OmitType, PartialType } from '@nestjs/swagger';

import { UserRegisterResponseDto } from './user-register-response.dto';

export class UserLoginResponseDto extends PartialType(
  OmitType(UserRegisterResponseDto, ['guid'] as const),
) {}

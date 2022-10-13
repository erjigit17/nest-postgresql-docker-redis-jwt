import { UnauthorizedException } from '@nestjs/common';

export class InvalidEmailOrPasswordException extends UnauthorizedException {
  constructor() {
    super('error.invalidEmailOrPassword');
  }
}

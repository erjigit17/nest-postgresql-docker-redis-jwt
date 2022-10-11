// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ITokenPayload } from 'auth/token-payload.interface';
// import { Request } from 'express';
// import { Strategy } from 'passport-jwt';
//
// import { JWT_REFRESH_TOKEN_COOKIE_NAME } from '../../constants/cookies.constants';
//
// const cookieExtractor = (req: Request): string | null =>
//   req?.cookies?.[JWT_REFRESH_TOKEN_COOKIE_NAME];
//
// @Injectable()
// export class JwtRefreshStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-refresh',
// ) {
//   constructor(configService: ConfigService) {
//     super({
//       jwtFromRequest: cookieExtractor,
//       secretOrKey: configService.get('jwt-refresh.secret'),
//       passReqToCallback: true,
//     });
//   }
//
//   async validate(
//     req: Request,
//     payload: ITokenPayload,
//   ): Promise<{
//     name: string;
//     id: string;
//     email: string;
//     refreshToken: string | null;
//   }> {
//     return {
//       refreshToken: cookieExtractor(req),
//       ...payload,
//     };
//   }
// }

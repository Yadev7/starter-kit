import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: number;
  email: string;
};

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('RT_SECRET') || 'rt-secret',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const authHeader = req.get('authorization');
    if (!authHeader) throw new ForbiddenException('Refresh token malformed');

    // استخدام Regex متطورة كتقطع الكلمة كيفما كتبت (Bearer/bearer/BEARER)
    const refreshToken = authHeader.replace(/^Bearer\s+/i, '').trim();

    return {
      ...payload,
      refreshToken,
    };
  }
}
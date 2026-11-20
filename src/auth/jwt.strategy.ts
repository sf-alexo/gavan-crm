import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CRM_AUD } from './auth.service';
import { Role } from '@prisma/client';

type JwtPayload = {
  sub: string;
  email: string;
  role?: Role;
  aud?: string | string[];
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      issuer: 'gavan',
    });
  }

  async validate(payload: JwtPayload) {
    const aud = Array.isArray(payload.aud) ? payload.aud[0] : payload.aud;
    if (aud !== CRM_AUD) {
      throw new UnauthorizedException('Invalid token audience');
    }
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user || !user.isActive) {
      throw new UnauthorizedException();
    }
    return { userId: user.id, email: user.email, role: user.role };
  }
}

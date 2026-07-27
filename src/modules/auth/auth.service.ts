import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService, // 👈 تزاد هادي
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);

    // Use non-null assertion (!) if you are 100% sure dto.email exists due to validation pipes
    const newUser = await this.prisma.user.create({
      data: { 
        email: dto.email!, 
        hash 
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.role);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({ 
      where: { email: dto.email } 
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  hashData(data: string) { 
    return bcrypt.hash(data, 10); 
  }


async logout(userId: number): Promise<boolean> {
  await this.prisma.user.updateMany({
    where: {
      id: userId,
      hashedRt: {
        not: null,
      },
    },
    data: {
      hashedRt: null,
    },
  });
  return true;
}

async getTokens(userId: number, email: string, role?: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role }, 
        { secret: this.config.get<string>('AT_SECRET') || 'at-secret', expiresIn: '15m' }
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role }, 
        { secret: this.config.get<string>('RT_SECRET') || 'rt-secret', expiresIn: '7d' }
      ),
    ]);
    return { access_token: at, refresh_token: rt };
  }

async refreshTokens(userId: number, rt: string): Promise<Tokens> {
  const user = await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

  const rtMatches = await bcrypt.compare(rt, user.hashedRt);
  if (!rtMatches) throw new ForbiddenException('Access Denied');

  const tokens = await this.getTokens(user.id, user.email);
  await this.updateRtHash(user.id, tokens.refresh_token);

  return tokens;
}


// async getTokens(userId: number, email: string): Promise<Tokens> {
//   const [at, rt] = await Promise.all([
//     this.jwtService.signAsync(
//       { sub: userId, email }, 
//       { secret: this.config.get<string>('AT_SECRET') || 'at-secret', expiresIn: '15m' }
//     ),
//     this.jwtService.signAsync(
//       { sub: userId, email }, 
//       { secret: this.config.get<string>('RT_SECRET') || 'rt-secret', expiresIn: '7d' }
//     ),
//   ]);
//   return { access_token: at, refresh_token: rt };
// }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({ 
      where: { id: userId }, 
      data: { hashedRt: hash } 
    });
  }
}
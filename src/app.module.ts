import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core'; // 👈 حل مشكلة APP_GUARD
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module'; // 👈 حل مشكلة AuthModule
import { AtGuard } from './common/guards/at.guard'; // 👈 حل مشكلة AtGuard

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 👈 حل مشكلة ConfigModule
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // 👈 تفعيل Throttling على جميع الـ Endpoints
    },
  ],
})
export class AppModule {}
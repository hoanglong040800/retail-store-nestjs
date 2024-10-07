import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/modules/users';
import { JwtModule } from '@nestjs/jwt';
import { CartsModule } from '@/modules/carts';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),

    UsersModule,
    CartsModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

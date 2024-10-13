import { ENV } from '@/constants';
import { SignedTokenData } from '@/modules/auth';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = (request.headers as any).authorization;

    const [type, token] = authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException();
      }

      const payload: SignedTokenData = await this.jwtService.verifyAsync(
        token,
        {
          secret: ENV.jwt.access.secret,
        },
      );

      request['user'] = payload.user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

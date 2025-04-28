import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

interface GqlContext {
  req: Request;
}

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request: Request;
    const type = context.getType<string>();

    if (type === 'http') {
      request = context.switchToHttp().getRequest<Request>();
    } else if (type === 'graphql') {
      const gqlContext =
        GqlExecutionContext.create(context).getContext<GqlContext>();
      request = gqlContext.req;
    } else {
      throw new UnauthorizedException('Unsupported request context');
    }

    const authHeader = request.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    const isValid = await this.authService.validateToken(token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }
}

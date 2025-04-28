import { Injectable, UnauthorizedException } from '@nestjs/common';
import fetch from 'node-fetch';
import * as querystring from 'querystring';
import { ConfigService } from '@nestjs/config';

interface KeycloakIntrospectionResponse {
  active: boolean;
}

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  async validateToken(token: string): Promise<boolean> {
    const response = await fetch(
      `${this.configService.get<string>('KEYCLOAK_URL')}/realms/myrealm/protocol/openid-connect/token/introspect`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
          client_id: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
          client_secret: this.configService.get<string>(
            'KEYCLOAK_CLIENT_SECRET',
          ),
          token: token,
        }),
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException('Failed to validate token with Keycloak');
    }

    const data = (await response.json()) as KeycloakIntrospectionResponse;
    return data.active;
  }
}

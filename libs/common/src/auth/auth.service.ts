import { Injectable, UnauthorizedException } from '@nestjs/common';
import fetch from 'node-fetch';
import * as querystring from 'querystring';
import { ConfigService } from '@nestjs/config';

interface KeycloakIntrospectionResponse {
  active: boolean;
}

interface KeycloakTokenResponse {
  access_token: string;
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

  async login(
    username: string,
    password: string,
  ): Promise<KeycloakTokenResponse> {
    const response = await fetch(
      `${this.configService.get<string>('KEYCLOAK_URL')}/realms/myrealm/protocol/openid-connect/token`,
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
          grant_type: 'password',
          username: username,
          password: password,
        }),
      },
    );

    if (!response.ok) {
      throw new UnauthorizedException();
    }

    return await response.json();
  }

  async getAdminToken(): Promise<string> {
    const response = await fetch(
      `${this.configService.get<string>('KEYCLOAK_URL')}/realms/master/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
          client_id: this.configService.get<string>('KEYCLOAK_ADMIN_CLIENT_ID'),
          client_secret: this.configService.get<string>(
            'KEYCLOAK_ADMIN_CLIENT_SECRET',
          ),
          grant_type: 'password',
          username: this.configService.get<string>('KEYCLOAK_ADMIN_USERNAME'),
          password: this.configService.get<string>('KEYCLOAK_ADMIN_PASSWORD'),
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to obtain admin token from Keycloak');
    }

    const adminToken = await response.json();
    return adminToken.access_token;
  }

  async createUser(userData: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<string> {
    const adminToken = await this.getAdminToken();

    const response = await fetch(
      `${this.configService.get<string>('KEYCLOAK_URL')}/admin/realms/myrealm/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: userData.password,
              temporary: false,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to create user in Keycloak');
    }

    const locationHeader = response.headers.get('Location');
    const userId = locationHeader?.split('/').pop();

    if (!userId) {
      throw new Error('User ID could not be extracted from Location header');
    }

    return userId;
  }
}

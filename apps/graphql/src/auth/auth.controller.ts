import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoginInputDto, LoginOutputDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as querystring from 'node:querystring';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/common/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() data: LoginInputDto): Promise<LoginOutputDto> {
    const { email, password } = data;

    const response = await fetch(
      `${this.configService.get<string>('KEYCLOAK_URL')}/realms/myrealm/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
          client_id: process.env.KEYCLOAK_CLIENT_ID,
          client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
          grant_type: 'password',
          username: email,
          password: password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch tokens');
    }

    return (await response.json()) as LoginOutputDto;
  }

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<UserEntity> {
    const { email, password, username, firstName, lastName } = data;

    try {
      const adminTokenResponse = await fetch(
        `${this.configService.get<string>('KEYCLOAK_URL')}/realms/master/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: querystring.stringify({
            client_id: this.configService.get<string>(
              'KEYCLOAK_ADMIN_CLIENT_ID',
            ),
            client_secret: this.configService.get<string>(
              'KEYCLOAK_CLIENT_SECRET',
            ),
            grant_type: 'password',
            username: this.configService.get<string>('KEYCLOAK_ADMIN_USERNAME'),
            password: this.configService.get<string>('KEYCLOAK_ADMIN_PASSWORD'),
          }),
        },
      );

      if (!adminTokenResponse.ok) {
        throw new Error('Failed to obtain admin token');
      }

      const adminToken = await adminTokenResponse.json();

      const userResponse = await fetch(
        `${this.configService.get<string>('KEYCLOAK_URL')}/admin/realms/myrealm/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken.access_token}`,
          },
          body: JSON.stringify({
            username,
            email,
            firstName,
            lastName,
            enabled: true,
            credentials: [
              {
                type: 'password',
                value: password,
                temporary: false,
              },
            ],
          }),
        },
      );

      if (!userResponse.ok) {
        throw new Error('Failed to create user');
      }

      const locationHeader = userResponse.headers.get('Location');
      if (!locationHeader) {
        throw new Error('User created but ID not found in response');
      }
      const userId = locationHeader.split('/').pop();

      return this.userRepo.save({
        keycloak_id: userId,
        email,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }
}

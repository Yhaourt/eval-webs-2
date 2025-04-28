import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { KeycloakAuthGuard } from '@app/common/auth/keycloak-auth-guard';
import { UserService } from '@app/common/services/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { AuthService } from '@app/common/auth/auth.service';

@Controller('/api/users')
@UseGuards(KeycloakAuthGuard)
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async list(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    const users = await this.userService.list(skip, limit);
    return { users };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      return await this.userService.get(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const keycloakId = await this.authService.createUser(body);
    return await this.userService.create({
      ...body,
      keycloakId: keycloakId,
    });
  }
}

import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from '../types/user.type';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '@app/common/entities/user.entity';
import { UserService } from '@app/common/services/user.service';
import { KeycloakAuthGuard } from '@app/common/auth/keycloak-auth-guard';

@Resolver(() => UserType)
@UseGuards(KeycloakAuthGuard)
export class UserResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userService: UserService,
  ) {}

  @Query(() => [UserType])
  async listUsers(
    @Args('skip', { type: () => Number, nullable: true }) skip = 0,
    @Args('limit', { type: () => Number, nullable: true }) limit = 20,
  ): Promise<UserEntity[]> {
    return this.userService.list(skip, limit);
  }

  @Query(() => UserType, { nullable: true })
  async user(@Args('id') id: string): Promise<UserEntity> {
    return this.userService.get(id);
  }
}

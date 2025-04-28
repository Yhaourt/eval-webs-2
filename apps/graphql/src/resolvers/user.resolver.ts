import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from '../types/user.type';
import { UseGuards } from '@nestjs/common';
import { KeycloakAuthGuard } from '../auth/keycloak-auth-guard';
import { UserEntity } from '@app/common/entities/user.entity';

@Resolver(() => UserType)
@UseGuards(KeycloakAuthGuard)
export class UserResolver {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  @Query(() => [UserType])
  async listUsers(
    @Args('skip', { type: () => Number, nullable: true }) skip = 0,
    @Args('limit', { type: () => Number, nullable: true }) limit = 20,
  ): Promise<UserEntity[]> {
    return this.userRepo.find({
      skip,
      take: limit,
    });
  }

  @Query(() => UserType, { nullable: true })
  async user(@Args('id') id: string): Promise<UserEntity> {
    return this.userRepo.findOneOrFail({ where: { id } });
  }
}

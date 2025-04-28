import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInputType, UserType } from '../types/user.type';
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

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInputType): Promise<UserEntity> {
    const newUser = this.userRepo.create(input);
    const user = await this.userRepo.save(newUser);
    return this.userRepo.findOneOrFail({ where: { id: user.id } });
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UserInputType,
  ): Promise<UserEntity> {
    await this.userRepo.update({ id }, input);
    return this.userRepo.findOneByOrFail({ id });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    const user = await this.userRepo.findOneByOrFail({ id });
    await this.userRepo.remove(user);
    return true;
  }
}

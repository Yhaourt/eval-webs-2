import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotifInputType, NotifType } from '../types/notif.type';
import { UseGuards } from '@nestjs/common';
import { KeycloakAuthGuard } from '../auth/keycloak-auth-guard';
import { NotifEntity } from '@app/common/entities/notif.entity';

@Resolver(() => NotifType)
@UseGuards(KeycloakAuthGuard)
export class NotifResolver {
  constructor(
    @InjectRepository(NotifEntity)
    private readonly notifRepo: Repository<NotifEntity>,
  ) {}

  @Query(() => [NotifType])
  async listNotifs(
    @Args('skip', { type: () => Number, nullable: true }) skip = 0,
    @Args('limit', { type: () => Number, nullable: true }) limit = 20,
  ): Promise<NotifEntity[]> {
    return this.notifRepo.find({
      skip,
      take: limit,
      relations: ['reservation'],
    });
  }

  @Query(() => NotifType, { nullable: true })
  async notif(@Args('id') id: string): Promise<NotifEntity> {
    return this.notifRepo.findOneOrFail({
      where: { id },
      relations: ['reservation'],
    });
  }

  @Mutation(() => NotifType)
  async createNotif(
    @Args('input') input: NotifInputType,
  ): Promise<NotifEntity> {
    const newNotif = this.notifRepo.create(input);
    const notif = await this.notifRepo.save(newNotif);
    return this.notifRepo.findOneOrFail({
      where: { id: notif.id },
      relations: ['reservation'],
    });
  }

  @Mutation(() => NotifType)
  async updateNotif(
    @Args('id') id: string,
    @Args('input') input: NotifInputType,
  ): Promise<NotifEntity> {
    await this.notifRepo.update({ id }, input);
    return this.notifRepo.findOneOrFail({
      where: { id },
      relations: ['reservation'],
    });
  }

  @Mutation(() => Boolean)
  async deleteNotif(@Args('id') id: string): Promise<boolean> {
    const notif = await this.notifRepo.findOneOrFail({
      where: { id },
      relations: ['reservation'],
    });
    await this.notifRepo.remove(notif);
    return true;
  }
}

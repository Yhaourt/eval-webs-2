import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomInputType, RoomType } from '../types/room.type';
import { UseGuards } from '@nestjs/common';
import { KeycloakAuthGuard } from '../auth/keycloak-auth-guard';
import { RoomEntity } from '@app/common/entities/room.entity';

@Resolver(() => RoomType)
@UseGuards(KeycloakAuthGuard)
export class RoomResolver {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
  ) {}

  @Query(() => [RoomType])
  async listRooms(
    @Args('skip', { type: () => Number, nullable: true }) skip = 0,
    @Args('limit', { type: () => Number, nullable: true }) limit = 20,
  ): Promise<RoomEntity[]> {
    return this.roomRepo.find({
      skip,
      take: limit,
    });
  }

  @Query(() => RoomType, { nullable: true })
  async room(@Args('id') id: string): Promise<RoomEntity> {
    return this.roomRepo.findOneOrFail({ where: { id } });
  }

  @Mutation(() => RoomType)
  async createRoom(@Args('input') input: RoomInputType): Promise<RoomEntity> {
    const newRoom = this.roomRepo.create(input);
    const room = await this.roomRepo.save(newRoom);
    return this.roomRepo.findOneOrFail({ where: { id: room.id } });
  }

  @Mutation(() => RoomType)
  async updateRoom(
    @Args('id') id: string,
    @Args('input') input: RoomInputType,
  ): Promise<RoomEntity> {
    await this.roomRepo.update({ id }, input);
    return this.roomRepo.findOneByOrFail({ id });
  }

  @Mutation(() => Boolean)
  async deleteRoom(@Args('id') id: string): Promise<boolean> {
    const room = await this.roomRepo.findOneByOrFail({ id });
    await this.roomRepo.remove(room);
    return true;
  }
}

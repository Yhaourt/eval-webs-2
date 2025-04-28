import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoomInputType, RoomType } from '../types/room.type';
import { UseGuards } from '@nestjs/common';
import { RoomEntity } from '@app/common/entities/room.entity';
import { RoomService } from '@app/common/services/room.service';
import { KeycloakAuthGuard } from '@app/common/auth/keycloak-auth-guard';

@Resolver(() => RoomType)
@UseGuards(KeycloakAuthGuard)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => [RoomType])
  async listRooms(
    @Args('skip', { type: () => Number, nullable: true }) skip = 0,
    @Args('limit', { type: () => Number, nullable: true }) limit = 20,
  ): Promise<RoomEntity[]> {
    return this.roomService.list(skip, limit);
  }

  @Query(() => RoomType, { nullable: true })
  async room(@Args('id') id: string): Promise<RoomEntity> {
    return this.roomService.get(id);
  }

  @Mutation(() => RoomType)
  async createRoom(@Args('input') input: RoomInputType): Promise<RoomEntity> {
    return this.roomService.create(input);
  }

  @Mutation(() => RoomType)
  async updateRoom(
    @Args('id') id: string,
    @Args('input') input: RoomInputType,
  ): Promise<RoomEntity> {
    return this.roomService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteRoom(@Args('id') id: string): Promise<boolean> {
    await this.roomService.delete(id);
    return true;
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ReservationInputType,
  ReservationType,
} from '../types/reservation.type';
import { UseGuards } from '@nestjs/common';
import { ReservationEntity } from '@app/common/entities/reservation.entity';
import { ReservationService } from '@app/common/services/reservation.service';
import { KeycloakAuthGuard } from '@app/common/auth/keycloak-auth-guard';

@Resolver(() => ReservationType)
@UseGuards(KeycloakAuthGuard)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Query(() => [ReservationType])
  async listReservations(
    @Args('skip', { type: () => Number, nullable: true }) skip = 0,
    @Args('limit', { type: () => Number, nullable: true }) limit = 20,
  ): Promise<ReservationEntity[]> {
    return this.reservationService.list(skip, limit);
  }

  @Query(() => ReservationType, { nullable: true })
  async reservation(@Args('id') id: string): Promise<ReservationEntity> {
    return this.reservationService.get(id);
  }

  @Mutation(() => ReservationType)
  async createReservation(
    @Args('user_id') userId: string,
    @Args('room_id') roomId: string,
    @Args('start_time') startTime: Date,
    @Args('end_time') endTime: Date,
  ): Promise<ReservationEntity> {
    return this.reservationService.create({
      userId,
      roomId,
      startTime,
      endTime,
    });
  }

  @Mutation(() => ReservationType)
  async updateReservation(
    @Args('id') id: string,
    @Args('input') input: ReservationInputType,
  ): Promise<ReservationEntity> {
    return this.reservationService.update(id, {
      userId: input.user_id,
      roomId: input.room_id,
      startTime: input.start_time,
      endTime: input.end_time,
    });
  }

  @Mutation(() => Boolean)
  async deleteReservation(@Args('id') id: string): Promise<boolean> {
    await this.reservationService.delete(id);
    return true;
  }
}

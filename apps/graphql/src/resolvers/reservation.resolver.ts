import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ReservationInputType,
  ReservationType,
} from '../types/reservation.type';
import { UseGuards } from '@nestjs/common';
import { KeycloakAuthGuard } from '../auth/keycloak-auth-guard';
import { ReservationEntity } from '@app/common/entities/reservation.entity';

@Resolver(() => ReservationType)
@UseGuards(KeycloakAuthGuard)
export class ReservationResolver {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepo: Repository<ReservationEntity>,
  ) {}

  @Query(() => [ReservationType])
  async listReservations(
    @Args('skip', { type: () => Number, nullable: true }) skip = 0,
    @Args('limit', { type: () => Number, nullable: true }) limit = 20,
  ): Promise<ReservationEntity[]> {
    return this.reservationRepo.find({
      skip,
      take: limit,
      relations: ['room', 'user'],
    });
  }

  @Query(() => ReservationType, { nullable: true })
  async reservation(@Args('id') id: string): Promise<ReservationEntity> {
    return this.reservationRepo.findOneOrFail({
      where: { id },
      relations: ['room', 'user'],
    });
  }

  @Mutation(() => ReservationType)
  async createReservation(
    @Args('input') input: ReservationInputType,
  ): Promise<ReservationEntity> {
    const newReservation = this.reservationRepo.create(input);
    const reservation = await this.reservationRepo.save(newReservation);
    return this.reservationRepo.findOneOrFail({
      where: { id: reservation.id },
      relations: ['room', 'user'],
    });
  }

  @Mutation(() => ReservationType)
  async updateReservation(
    @Args('id') id: string,
    @Args('input') input: ReservationInputType,
  ): Promise<ReservationEntity> {
    await this.reservationRepo.update({ id }, input);
    return this.reservationRepo.findOneOrFail({
      where: { id },
      relations: ['room', 'user'],
    });
  }

  @Mutation(() => Boolean)
  async deleteReservation(@Args('id') id: string): Promise<boolean> {
    const reservation = await this.reservationRepo.findOneOrFail({
      where: { id },
      relations: ['room', 'user'],
    });
    await this.reservationRepo.remove(reservation);
    return true;
  }
}

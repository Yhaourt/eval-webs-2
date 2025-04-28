import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from '@app/common/entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}

  async list(skip: number, take: number): Promise<ReservationEntity[]> {
    return this.reservationRepository.find({
      // relations: ['user', 'room', 'notifs'],
      skip,
      take,
    });
  }

  async get(id: string): Promise<ReservationEntity> {
    return this.reservationRepository.findOneOrFail({
      where: { id },
      // relations: ['user', 'room', 'notifs'],
    });
  }

  async create(data: Partial<ReservationEntity>): Promise<ReservationEntity> {
    const reservation = this.reservationRepository.create(data);
    return this.reservationRepository.save(reservation);
  }

  async update(
    id: string,
    data: Partial<ReservationEntity>,
  ): Promise<ReservationEntity> {
    await this.reservationRepository.update(id, data);
    return this.get(id);
  }

  async delete(id: string): Promise<void> {
    const reservation = await this.reservationRepository.findOneOrFail({
      where: { id },
    });
    await this.reservationRepository.remove(reservation);
  }
}

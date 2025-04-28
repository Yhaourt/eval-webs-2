import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotifEntity } from '@app/common/entities/notif.entity';

@Injectable()
export class NotifService {
  constructor(
    @InjectRepository(NotifEntity)
    private readonly notifRepository: Repository<NotifEntity>,
  ) {}

  async list(skip: number, take: number): Promise<NotifEntity[]> {
    return this.notifRepository.find({
      // relations: ['reservation'],
      skip,
      take,
    });
  }

  async get(id: string): Promise<NotifEntity> {
    return this.notifRepository.findOneOrFail({
      where: { id },
      // relations: ['reservation'],
    });
  }

  async create(notifData: Partial<NotifEntity>): Promise<NotifEntity> {
    const notif = this.notifRepository.create(notifData);
    return this.notifRepository.save(notif);
  }

  async update(
    id: string,
    notifData: Partial<NotifEntity>,
  ): Promise<NotifEntity> {
    await this.notifRepository.update(id, notifData);
    return this.get(id);
  }

  async delete(id: string): Promise<void> {
    await this.notifRepository.delete(id);
  }
}

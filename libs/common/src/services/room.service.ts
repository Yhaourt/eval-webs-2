import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '@app/common/entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async list(skip: number, take: number): Promise<RoomEntity[]> {
    return this.roomRepository.find({
      // relations: ['reservations'],
      skip,
      take,
    });
  }

  async get(id: string): Promise<RoomEntity> {
    return this.roomRepository.findOneOrFail({
      where: { id },
      // relations: ['reservations'],
    });
  }

  async create(data: Partial<RoomEntity>): Promise<RoomEntity> {
    const room = this.roomRepository.create(data);
    return this.roomRepository.save(room);
  }

  async update(id: string, data: Partial<RoomEntity>): Promise<RoomEntity> {
    await this.roomRepository.update(id, data);
    return this.get(id);
  }

  async delete(id: string): Promise<void> {
    const room = await this.roomRepository.findOneOrFail({ where: { id } });
    await this.roomRepository.remove(room);
  }
 
  
    async findOne(id: string): Promise<RoomEntity> {
      const room = await this.roomRepository.findOne({ where: { id } });
      if (!room) {
        throw new Error(`Room with id ${id} not found`);
      }
      return room;
    }
  
    async findAll(): Promise<RoomEntity[]> {
      return this.roomRepository.find();
    }
}

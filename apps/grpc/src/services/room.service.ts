import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import { RoomEntity } from '@app/common/entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly  roomRepository: Repository<RoomEntity>,
  ) {}

  async findOne(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new Error(`Room with id ${id} not found`);
    }
    return room;
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }
}

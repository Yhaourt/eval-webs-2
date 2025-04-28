import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/common/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async list(skip: number, take: number): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: ['reservations'],
      skip,
      take,
    });
  }

  async get(id: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: ['reservations'],
    });
  }

  async create(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<UserEntity>): Promise<UserEntity> {
    await this.userRepository.update(id, userData);
    return this.get(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

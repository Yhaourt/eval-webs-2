import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ReservationEntity } from './reservation.entity';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column()
  location: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.room, {
    cascade: true,
    eager: true,
  })
  reservations: ReservationEntity[];
}

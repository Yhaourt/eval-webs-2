import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RoomEntity } from './room.entity';
import { NotifEntity } from './notif.entity';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
  })
  user_id: string;

  @Column({
    name: 'room_id',
  })
  room_id: string;

  @Column({
    name: 'start_time',
  })
  start_time: Date;

  @Column({
    name: 'end_time',
  })
  end_time: Date;

  @Column()
  status: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;

  @JoinColumn({
    name: 'room_id',
  })
  @ManyToOne(() => RoomEntity, (room) => room.reservations)
  room: RoomEntity;

  @OneToMany(() => NotifEntity, (notif) => notif.reservation, {
    cascade: true,
    eager: true,
  })
  notifs: NotifEntity[];
}

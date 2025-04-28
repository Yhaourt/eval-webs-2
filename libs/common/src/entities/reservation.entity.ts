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

  @Column()
  user_id: string;

  @Column()
  room_id: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @JoinColumn()
  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;

  @JoinColumn()
  @ManyToOne(() => RoomEntity, (room) => room.reservations)
  room: RoomEntity;

  @OneToMany(() => NotifEntity, (notif) => notif.reservation, {
    cascade: true,
    eager: true,
  })
  notifs: NotifEntity[];
}

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
import { ReservationStatus } from '@app/common/enums/reservation-status';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  roomId: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

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

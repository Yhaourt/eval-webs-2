import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ReservationEntity } from './reservation.entity';

@Entity('notifications')
export class NotifEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reservationId: string;

  @Column()
  message: string;

  @Column()
  notificationDate: Date;

  @Column()
  isSent: boolean;

  @JoinColumn()
  @ManyToOne(() => ReservationEntity, (reservation) => reservation.notifs)
  reservation: ReservationEntity;
}

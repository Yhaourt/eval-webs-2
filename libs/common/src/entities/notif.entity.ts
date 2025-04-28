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
  reservation_id: string;

  @Column()
  message: string;

  @Column()
  notification_date: Date;

  @Column()
  is_sent: boolean;

  @JoinColumn()
  @ManyToOne(() => ReservationEntity, (reservation) => reservation.notifs)
  reservation: ReservationEntity;
}

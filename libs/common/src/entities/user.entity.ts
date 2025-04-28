import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ReservationEntity } from './reservation.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  keycloakId: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user, {
    cascade: true,
    eager: true,
  })
  reservations: ReservationEntity[];
}

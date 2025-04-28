import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/entities/user.entity';
import { RoomEntity } from '@app/common/entities/room.entity';
import { ReservationEntity } from '@app/common/entities/reservation.entity';
import { NotifEntity } from '@app/common/entities/notif.entity';
import { ConfigModule } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'pgpass',
      database: 'pgdb',
      entities: [UserEntity, RoomEntity, ReservationEntity, NotifEntity],
      synchronize: true,
      dropSchema: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      RoomEntity,
      ReservationEntity,
      NotifEntity,
    ]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class AppModule {}

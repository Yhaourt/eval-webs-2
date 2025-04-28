import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/entities/user.entity';
import { RoomEntity } from '@app/common/entities/room.entity';
import { ReservationEntity } from '@app/common/entities/reservation.entity';
import { NotifEntity } from '@app/common/entities/notif.entity';
import { ConfigModule } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ReservationService } from '@app/common/services/reservation.service';
import { RoomService } from '@app/common/services/room.service';
import { UserService } from '@app/common/services/user.service';
import { NotifService } from '@app/common/services/notif.service';
import { AuthModule } from '@app/common/auth/auth.module';

@Module({
  imports: [
    AuthModule,
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
  providers: [UserService, ReservationService, RoomService, NotifService],
  exports: [
    AuthModule,
    TypeOrmModule,
    UserService,
    ReservationService,
    RoomService,
    NotifService,
  ],
})
export class AppModule {}

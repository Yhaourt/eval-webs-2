import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AppModule } from '@app/common/app.module';
import { RoomsController } from './controllers/rooms.controller';
import { ReservationsController } from './controllers/reservations.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [AppModule],
  controllers: [
    AuthController,
    UsersController,
    RoomsController,
    ReservationsController,
  ],
  providers: [],
})
export class RestModule {}

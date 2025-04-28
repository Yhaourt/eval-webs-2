import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AppModule } from '@app/common/app.module';
import { RoomsController } from './controllers/rooms.controller';

@Module({
  imports: [AppModule],
  controllers: [AuthController, RoomsController],
  providers: [],
})
export class RestModule {}

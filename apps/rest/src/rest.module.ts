import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AppModule } from '@app/common/app.module';

@Module({
  imports: [AppModule],
  controllers: [AuthController],
  providers: [],
})
export class RestModule {}

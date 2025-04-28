import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KeycloakAuthGuard } from './keycloak-auth-guard';
import { AppModule } from '@app/common/app.module';

@Module({
  imports: [AppModule],
  providers: [AuthService, KeycloakAuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

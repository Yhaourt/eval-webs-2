import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KeycloakAuthGuard } from '@app/common/auth/keycloak-auth-guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [AuthService, KeycloakAuthGuard],
  exports: [AuthService, KeycloakAuthGuard],
})
export class AuthModule {}

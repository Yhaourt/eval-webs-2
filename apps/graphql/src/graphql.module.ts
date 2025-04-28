import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './resolvers/user.resolver';
import { ReservationResolver } from './resolvers/reservation.resolver';
import { RoomResolver } from './resolvers/room.resolver';
import { AuthModule } from './auth/auth.module';
import { AppModule } from '@app/common/app.module';

@Module({
  imports: [
    AppModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [UserResolver, RoomResolver, ReservationResolver],
})
export class GraphqlModule {}

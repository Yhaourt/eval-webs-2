import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './resolvers/user.resolver';
import { ReservationResolver } from './resolvers/reservation.resolver';
import { RoomResolver } from './resolvers/room.resolver';
import { AppModule } from '@app/common/app.module';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
  imports: [
    AppModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
  ],
  controllers: [],
  providers: [AuthResolver, UserResolver, RoomResolver, ReservationResolver],
})
export class GraphqlModule {}

import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { ReservationType } from './reservation.type';

@ObjectType()
export class UserType {
  @Field(() => ID) id: string;
  @Field() keycloak_id: string;
  @Field() email: string;
  @Field() created_at: Date;
  @Field(() => [ReservationType]) reservations: [ReservationType];
}

@ObjectType()
export class LoginType {
  @Field() access_token: string;
}

@InputType()
export class LoginInputType {
  @Field() email: string;
  @Field() password: string;
}

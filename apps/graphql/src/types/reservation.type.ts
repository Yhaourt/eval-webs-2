import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { RoomType } from './room.type';
import { UserType } from './user.type';
import { NotifType } from './notif.type';

@ObjectType()
export class ReservationType {
  @Field(() => ID) id: string;
  @Field({ name: 'room_id' }) roomId: string;
  @Field({ name: 'user_id' }) userId: string;
  @Field({ name: 'start_time' }) startTime: Date;
  @Field({ name: 'end_time' }) endTime: Date;
  @Field() status: string;
  @Field({ name: 'created_at' }) createdAt: Date;
  @Field(() => RoomType) room: RoomType;
  @Field(() => UserType) user: UserType;
  @Field(() => [NotifType]) notifs: [NotifType];
}

@InputType()
export class ReservationInputType {
  @Field() room_id: string;
  @Field() user_id: string;
  @Field() start_time: Date;
  @Field() end_time: Date;
}

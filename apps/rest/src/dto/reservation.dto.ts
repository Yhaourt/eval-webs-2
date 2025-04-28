import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  userId: string;

  @IsString()
  roomId: string;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;
}

export class UpdateReservationDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  roomId?: string;

  @IsOptional()
  @IsDateString()
  startTime?: Date;

  @IsOptional()
  @IsDateString()
  endTime?: Date;
}

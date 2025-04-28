import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsNumber()
  capacity: number;

  @IsString()
  location: string;
}

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsString()
  location?: string;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from '@app/common/services/room.service';
import { KeycloakAuthGuard } from '@app/common/auth/keycloak-auth-guard';
import { CreateRoomDto, UpdateRoomDto } from '../dto/room.dto';

@Controller('/api/rooms')
@UseGuards(KeycloakAuthGuard)
export class RoomsController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async list(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    const rooms = await this.roomService.list(skip, limit);
    return { rooms };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      return await this.roomService.get(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  async create(@Body() body: CreateRoomDto) {
    return await this.roomService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateRoomDto) {
    try {
      return await this.roomService.update(id, body);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      await this.roomService.delete(id);
      return;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}

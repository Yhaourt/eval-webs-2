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
import { KeycloakAuthGuard } from '@app/common/auth/keycloak-auth-guard';
import { ReservationService } from '@app/common/services/reservation.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from '../dto/reservation.dto';

@Controller('/api/reservations')
@UseGuards(KeycloakAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async list(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    const reservations = await this.reservationService.list(skip, limit);
    return { reservations };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      return await this.reservationService.get(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  async create(@Body() body: CreateReservationDto) {
    return await this.reservationService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateReservationDto) {
    try {
      return await this.reservationService.update(id, body);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      await this.reservationService.delete(id);
      return;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationService } from '../services/notification.service';
import { NotifService } from '@app/common/services/notif.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotifService) {}

  @GrpcMethod('NotificationService', 'CreateNotification')
  async createNotification(data: {
    reservationId?: string;
    reservation_id?: string;
    message: string;
  }) {
    // vérifie les deux cas : camelCase et snake_case
    const reservationId = data.reservationId ?? data.reservation_id;
    console.log(
      'createNotification payload:',
      data,
      '→ reservation_id:',
      reservationId,
    );

    if (!reservationId) {
      throw new Error('reservation_id is required');
    }
    const notif = await this.notificationService.CreateNotification(
      reservationId,
      data.message,
    );
    return {
      id: notif.id,
      reservationId: notif.reservationId,
      message: notif.message,
      notificationDate: {
        seconds: Math.floor(notif.notificationDate.getTime() / 1000),
        nanos: 0,
      },
      is_sent: notif.isSent,
    };
  }

  @GrpcMethod('NotificationService', 'UpdateNotification')
  async updateNotification(data: { id: string; message: string }) {
    const notif = await this.notificationService.UpdateNotification(
      data.id,
      data.message,
    );
    return {
      id: notif.id,
      reservationId: notif.reservationId,
      message: notif.message,
      notification_date: {
        seconds: Math.floor(notif.notificationDate.getTime() / 1000),
        nanos: 0,
      },
      is_sent: notif.isSent,
    };
  }

  @GrpcMethod('NotificationService', 'ExportReservationsToCSV')
  async exportReservationsToCSV(data: { user_id: string }) {
    const url = await this.notificationService.exportToCSV(data.user_id);
    return { url };
  }
}

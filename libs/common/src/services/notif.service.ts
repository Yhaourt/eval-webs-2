import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotifEntity } from '@app/common/entities/notif.entity';
import { ReservationEntity } from '../entities/reservation.entity';
import { format } from '@fast-csv/format';
import { PassThrough } from 'stream';
import { v4 as uuid } from 'uuid';
import { Client as MinioClient, ClientOptions } from 'minio';

@Injectable()
export class NotifService {

  constructor(
    @InjectRepository(NotifEntity)
    private readonly notifRepository: Repository<NotifEntity>,
    @InjectRepository(ReservationEntity)
      private readonly reservationRepo: Repository<ReservationEntity>,
  ) {}

  async list(skip: number, take: number): Promise<NotifEntity[]> {
    return this.notifRepository.find({
      // relations: ['reservation'],
      skip,
      take,
    });
  }

  async get(id: string): Promise<NotifEntity> {
    return this.notifRepository.findOneOrFail({
      where: { id },
      // relations: ['reservation'],
    });
  }

  async create(notifData: Partial<NotifEntity>): Promise<NotifEntity> {
    const notif = this.notifRepository.create(notifData);
    return this.notifRepository.save(notif);
  }

  async update(
    id: string,
    notifData: Partial<NotifEntity>,
  ): Promise<NotifEntity> {
    await this.notifRepository.update(id, notifData);
    return this.get(id);
  }

  async delete(id: string): Promise<void> {
    await this.notifRepository.delete(id);
  }

 
  
    private minioClient: MinioClient;
  
    private initMinio() {
      if (!this.minioClient) {
        const options: ClientOptions = {
          endPoint: 'localhost',
          port: 9090,
          useSSL: false,
          accessKey: 'minioadmin',
          secretKey: 'minioadmin',
        };
        this.minioClient = new MinioClient(options);
      }
      return this.minioClient;
    }
  
    async exportToCSV(userId: string): Promise<string> {
      const reservations = await this.reservationRepo.find({
        where: { user_id: userId },
      });
  
      const csvStream = format({ headers: true });
      const bufferStream = new PassThrough();
      const filename = `reservations-${userId}-${uuid()}.csv`;
  
      // Pipe CSV data into buffer
      csvStream.pipe(bufferStream);
  
      // Write rows
      reservations.forEach((r) => {
        csvStream.write({
          id: r.id,
          roomId: r.roomId,
          userId: r.userId,
          status: r.status,
          startTime: r.startTime.toISOString(),
          endTime: r.endTime.toISOString(),
        });
      });
      csvStream.end();
  
      // Ensure MinIO client is initialized
      const minio = this.initMinio();
  
      // Upload to MinIO
      await minio.putObject('csvs', filename, bufferStream, undefined, {
        'Content-Type': 'text/csv',
      });
  
      // Generate presigned URL (7 days)
      const url = await minio.presignedUrl(
        'GET',
        'csvs',
        filename,
        7 * 24 * 60 * 60,
      );
      return url;
    }
  
    async CreateNotification(
      reservationId: string,
      message: string,
    ): Promise<NotifEntity> {
      try {
        const notif = this.notifRepository.create({
          reservationId,
          message,
          notificationDate: new Date(),
          isSent: false,
        });
        console.log('notif:', notif);
  
        return await this.notifRepository.save(notif);
      } catch (error) {
        console.error('Erreur dans CreateNotification:', error);
        throw new Error('Erreur lors de la création de la notification');
      }
    }
  
    async UpdateNotification(id: string, message: string): Promise<NotifEntity> {
      try {
        const notif = await this.notifRepository.findOne({ where: { id } });
        if (!notif) throw new NotFoundException('Notification not found');
        notif.message = message;
        return await this.notifRepository.save(notif);
      } catch (error) {
        console.error('Erreur dans UpdateNotification:', error);
        if (error instanceof NotFoundException) {
          throw error; // laisser Nest gérer les erreurs connues
        }
        throw new Error('Erreur lors de la mise à jour de la notification');
      }
    }
  
}

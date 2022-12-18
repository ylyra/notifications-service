import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | undefined> {
    const raw = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    });

    if (!raw) {
      return undefined;
    }

    return PrismaNotificationMapper.toDomain(raw);
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    await this.prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }
}

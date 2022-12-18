import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';

type PrismaNotification = {
  id: string;
  content: string;
  category: string;
  recipientId: string;
  readAt: Date | null | undefined;
  createdAt: Date;
  cancelledAt: Date | null | undefined;
};

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      cancelledAt: notification.cancelledAt,
    };
  }

  static toDomain(raw: PrismaNotification): Notification {
    return new Notification({
      id: raw.id,
      content: new Content(raw.content),
      category: raw.category,
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      createdAt: raw.createdAt,
      cancelledAt: raw.cancelledAt,
    });
  }
}

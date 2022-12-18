import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';

export class NotificationsRepositoryInMemory
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(id: string): Promise<Notification | undefined> {
    return Promise.resolve(
      this.notifications.find((notification) => notification.id === id),
    );
  }

  async save(notification: Notification): Promise<void> {
    this.notifications = this.notifications.map((n) =>
      n.id === notification.id ? notification : n,
    );
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return Promise.resolve(
      this.notifications.filter(
        (notification) => notification.recipientId === recipientId,
      ).length,
    );
  }
}

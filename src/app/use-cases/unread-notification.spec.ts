import { makeNotification } from '@test/factories/notification-factory';
import { NotificationsRepositoryInMemory } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { UnreadNotification } from './unread-notification';

describe('unread notification', () => {
  it('shoudl be able to unread a notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const request = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(request);

    await unreadNotification.execute({ notificationId: request.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification that does not exist', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'facke-notification',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});

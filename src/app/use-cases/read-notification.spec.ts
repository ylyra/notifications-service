import { NotificationsRepositoryInMemory } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { ReadNotification } from './read-notification';
import { SendNotification } from './send-notification';

describe('read notification', () => {
  it('shoudl be able to read a notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const readNotification = new ReadNotification(notificationsRepository);
    const sendNotification = new SendNotification(notificationsRepository);

    const request = {
      recipientId: 'b567ab08-c166-4925-bf2c-bffb1e089c5d',
      content: 'Hello world',
      category: 'category',
    };
    const { notification } = await sendNotification.execute(request);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification that does not exist', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'facke-notification',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});

import { NotificationsRepositoryInMemory } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { SendNotification } from './send-notification';

describe('cancel notification', () => {
  it('shoudl be able to cancel a notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const cancelNotification = new CancelNotification(notificationsRepository);
    const sendNotification = new SendNotification(notificationsRepository);

    const request = {
      recipientId: 'b567ab08-c166-4925-bf2c-bffb1e089c5d',
      content: 'Hello world',
      category: 'category',
    };
    const { notification } = await sendNotification.execute(request);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].cancelledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification that does not exist', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      cancelNotification.execute({ notificationId: 'invalid-id' });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});

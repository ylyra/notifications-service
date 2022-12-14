import { NotificationsRepositoryInMemory } from '../../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('shoudl be able to send a notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const sendNotification = new SendNotification(notificationsRepository);
    const request = {
      recipientId: 'b567ab08-c166-4925-bf2c-bffb1e089c5d',
      content: 'Hello world',
      category: 'category',
    };

    const { notification } = await sendNotification.execute(request);

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});

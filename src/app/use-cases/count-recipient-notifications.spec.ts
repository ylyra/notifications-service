import { NotificationsRepositoryInMemory } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { SendNotification } from './send-notification';

describe('count recipient notifications', () => {
  it('should count notifications by recipient id', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const sendNotification = new SendNotification(notificationsRepository);
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await sendNotification.execute({
      recipientId: 'b567ab08-c166-4925-bf2c-bffb1e089c5d',
      content: 'Hello world',
      category: 'category',
    });
    await sendNotification.execute({
      recipientId: '37c46ed4-8e04-4309-86ff-17167abe1919',
      content: 'Hello world 2',
      category: 'category',
    });

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'b567ab08-c166-4925-bf2c-bffb1e089c5d',
    });

    expect(count).toEqual(1);
  });
});

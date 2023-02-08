import { NotificationsRepositoryInMemory } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';
import { SendNotification } from './send-notification';

describe('get recipient notifications', () => {
  it('should get notifications by recipient id', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const sendNotification = new SendNotification(notificationsRepository);
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'b567ab08-c166-4925-bf2c-bffb1e089c5d',
    });

    expect(notifications.length).toEqual(1);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: 'b567ab08-c166-4925-bf2c-bffb1e089c5d',
        }),
      ]),
    );
  });
});

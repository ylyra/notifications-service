import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const content = new Content('Hello world');
    const notification = new Notification({
      recipientId: 'b567ab08-c166-4925-bf2c-bffb1e089c5d',
      content,
      category: 'category',
    });

    expect(notification).toBeTruthy();
  });
});

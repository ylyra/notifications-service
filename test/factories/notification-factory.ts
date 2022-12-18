import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'b567ab08-c166-4925-bf2c-bffb1e089c5d',
    category: 'category',
    content: new Content('Hello world'),
    ...override,
  });
}

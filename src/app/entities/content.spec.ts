import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Hello world');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => {
      new Content('Ho');
    }).toThrow(new Error('Invalid content length'));
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => {
      new Content(
        'Mussum Ipsum, cacilds vidis litro abertis. Delegadis gente finis, bibendum egestas augue arcu ut est.Paisis, filhis, espiritis santis.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.Quem num gosta di mim que vai caçá sua turmis!',
      );
    }).toThrow(new Error('Invalid content length'));
  });
});

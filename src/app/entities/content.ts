export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentValid = this.validateContentLength(content);

    if (!isContentValid) {
      throw new Error('Invalid content length');
    }

    this.content = content;
  }
}

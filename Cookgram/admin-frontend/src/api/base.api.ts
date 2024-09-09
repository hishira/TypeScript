export abstract class BaseApi {
  private readonly URL = 'http://127.0.0.1:3000';

  protected prepareLink(urlAppend: string): string {
    return `${this.URL}/${urlAppend}`;
  }
}

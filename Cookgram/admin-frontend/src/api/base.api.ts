import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export abstract class BaseApi {
  private readonly URL = 'http://127.0.0.1:3000';
  
  protected readonly httpService: HttpClient = inject(HttpClient); 
  
  protected prepareLink(urlAppend: string): string {
    return `${this.URL}/${urlAppend}`;
  }
}

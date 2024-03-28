import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

export class Application {
  private readonly PORT: number = 8080;
  private _nestApp: NestExpressApplication;

  async createApp(): Promise<void> {
    this._nestApp = await NestFactory.create<NestExpressApplication>(AppModule);
  }

  enableCors(): void {
    this._nestApp.enableCors();
  }

  async listen(): Promise<void> {
    await this._nestApp.listen(this.PORT);
  }

  closeApp(): void {
    this._nestApp.close();
  }
}

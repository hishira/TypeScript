import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

export class Application {
  private readonly PORT: number = 8080;
  private _nestApp: NestExpressApplication;

  async createApp() {
    this._nestApp = await NestFactory.create<NestExpressApplication>(AppModule);
  }
  enableCors() {
    this._nestApp.enableCors();
  }
  async listen() {
    await this._nestApp.listen(this.PORT);
  }
  closeApp() {
    this._nestApp.close();
  }
}

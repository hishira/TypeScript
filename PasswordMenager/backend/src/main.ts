import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Application } from './Application';
const PORT = 8080;
declare const module: any;
async function bootstrap() {
  const application = new Application();
  await application.createApp();
  application.enableCors();
  //const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.enableCors();

  await application.listen();
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => application.closeApp());
  }
}
bootstrap();

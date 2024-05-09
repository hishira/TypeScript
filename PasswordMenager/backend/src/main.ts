import Module from 'module';
import { Application } from './Application';
declare const module: Module;
async function bootstrap(): Promise<void> {
  const application = new Application();
  await application.createApp();
  application.enableCors();

  await application.listen();
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => application.closeApp());
  }
}
bootstrap();

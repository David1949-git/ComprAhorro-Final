import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', optionsSuccessStatus: 204 });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Motor de ComprAhorro encendido en puerto: ${port}`);
}
bootstrap();

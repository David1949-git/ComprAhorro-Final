import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = 10000;
  await app.listen(port);
  console.log(`🚀 Motor de ComprAhorro encendido en puerto: ${port}`);
}
bootstrap();

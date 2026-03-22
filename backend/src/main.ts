require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para que el Frontend pueda hablar con el Backend
  app.enableCors();
  
  // Puerto profesional para Render/Local
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('--- SERVIDOR ComprAhorro: ONLINE EN PUERTO ' + port + ' ---');
}
bootstrap();
